import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import User from "../../models/user.js";

const router = express.Router();

// Configuration constants
const SECRET_KEY = "e fv vdn vnd mnd ";
const GOOGLE_CLIENT_ID = "461007347625-l1nn6bsd0cerjad6j6g23qqnqatn1evf.apps.googleusercontent.com";
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);


// **Login Route**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/signin", async (req, res) => {
  try {
    console.log("Incoming sign-in request:", req.body); // Log request

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id },SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Signin error:", error); // Log backend errors
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    
    if (!payload.email_verified) {
      return res.status(400).json({ message: "Google email not verified" });
    }

    const { email, name, picture, sub } = payload;

    // Check if user exists by googleId or email
    let user = await User.findOne({ 
      $or: [
        { googleId: sub },
        { email }
      ]
    });

    if (!user) {
      // Create new user
      user = new User({
        email,
        fullname: name,
        googleId: sub,
        picture,
        isGoogleAuth: true,
        isVerified: true // Mark as verified since Google verified the email
      });
      await user.save();
    } else if (!user.googleId) {
      // User exists but didn't sign up with Google before
      user.googleId = sub;
      user.isGoogleAuth = true;
      user.picture = picture;
      await user.save();
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        name: user.fullname,
        picture: user.picture
      }, 
      SECRET_KEY, 
      { expiresIn: "1h" }
    );

    res.json({ 
      message: "Google login successful", 
      token,
      user: {
        email: user.email,
        name: user.fullname,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ 
      message: "Google authentication failed",
      error: error.message 
    });
  }
});

export default router;
