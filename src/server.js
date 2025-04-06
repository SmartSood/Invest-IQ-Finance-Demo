import express from "express";
import mongoose from "mongoose";  // Add this back for auth routes
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { MongoClient } from "mongodb";

// server.js
import axios from 'axios';  // Make sure to import axios
import cors from 'cors'
import cheerio from 'cheerio';

import admin from 'firebase-admin';
dotenv.config();

const app = express();



// Middleware
const allowedOrigins = [
  'http://:5173', // Your Vite dev server
  'https://invest-iq-finance-demo.vercel.app',
  'https://invest-iq-finance-demo-1.onrender.com'
];

const corsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  origin:"*",
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json())






const GOOGLE_API_KEY = "AIzaSyAAvV790SgykzvhGIvBoqYYRh3rwoip_2Q"; // Replace with your actual API key


app.post("/translate", async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    
    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;

    const response = await axios.post(url, {
      q: text,
      target: targetLanguage,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Translation Error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

// MongoDB Atlas Connection (for Mongoose)
const mongoURI = "mongodb+srv://Smarth:Smarth@cluster0.k74jd.mongodb.net/FinanceApp?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB connected successfully via Mongoose"))
.catch(err => console.error("Mongoose connection error:", err));

// Function to get MongoDB client (for `MongoClient` queries)
const uri = mongoURI;
const dbName = "FinanceApp";

async function getDbClient() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

// Route to get module and level info by moduleId
app.get("/api/Module/:moduleId", async (req, res) => {
  const moduleId = parseInt(req.params.moduleId);
  
  if (isNaN(moduleId)) {
    return res.status(400).json({ error: "Invalid module ID" });
  }

  const client = await getDbClient();
  const db = client.db(dbName);
  
  try {
    const moduleCollection = db.collection("Module");
    const levelsCollection = db.collection("Levels");

    const [module, levels] = await Promise.all([
      moduleCollection.findOne({ Module_no: moduleId }),
      levelsCollection.find({ Module_no: moduleId }).sort({ Level_no: 1 }).toArray()
    ]);

    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    res.json({
      moduleInfo: module,
      levels: levels
    });
  } catch (error) {
    console.error("Error fetching module data:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  } finally {
    await client.close();
  }
});
app.get("/api/levels/:moduleId/:levelId",async (req,res)=>{
  const moduleId = parseInt(req.params.moduleId);
  const levelId = parseInt(req.params.levelId);
  if (isNaN(moduleId) || isNaN(levelId)) {
    return res.status(400).json({ error: "Invalid module or level ID" });
  }
  const client = await getDbClient();
  const db = client.db(dbName);
  try {
    const levelsCollection = db.collection("Levels");
    const levels = await levelsCollection.find({
      Module_no: moduleId,
      Level_no: levelId
    }).toArray();
    if (!levels) {
      return res.status(404).json({ error: "Level not found" });
    }
    res.json({
      levels: levels
    })
  }catch(error){
    console.error("Error fetching level data:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
  finally{
    await client.close();
  }
    
})
// Route to get all modules
app.get('/api/Module', async (req, res) => {
  const client = await getDbClient();
  const db = client.db(dbName);
  
  try {
    const moduleCollection = db.collection("Module");
    const modules = await moduleCollection.find({}).toArray();
    
    res.json(modules);
  } catch (error) {
    console.error("Error fetching all modules:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    await client.close();
  }
});


app.get('/api/modules', async (req, res) => {
  const client = await getDbClient();
  const db = client.db(dbName);
  
  try {
    const modules = await db.collection("Module")
      .find({})
      .sort({ Module_no: 1 }) // Sort by module number
      .toArray();
    
    // Transform data if needed (e.g., ensure image URL is complete)
    const formattedModules = modules.map(module => ({
      id: module._id,
      title: module.Module_Name,
      description: module.Module_heading,
      moduleNumber: module.Module_no,
      imageUrl: module.Level_image 
        ? module.Level_image.startsWith('http') 
          ? module.Level_image 
          : `${process.env.BASE_URL || ''}${module.Level_image}`
        : null
    }));

    res.json(formattedModules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({ error: "Failed to fetch modules" });
  } finally {
    await client.close();
  }
});
app.get('/api/users/:userId', async (req, res) => {
  try {
    const client = await getDbClient();
    const db = client.db(dbName);
    
    const user = await db.collection("Users").findOne(
      { _id: new ObjectId(req.params.userId) },
      { projection: { unlockedModules: 1, xp: 1, moduleProgress: 1 } }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      unlockedModules: user.unlockedModules || [],
      xp: user.xp || 0,
      moduleProgress: user.moduleProgress || {}
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
});

// Unlock module endpoint
app.post('/api/users/unlock-module', async (req, res) => {
  try {
    const { userId, moduleId, xpCost } = req.body;
    const client = await getDbClient();
    const db = client.db(dbName);
    
    // Check user has enough XP
    const user = await db.collection("Users").findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.xp < xpCost) {
      return res.status(400).json({ message: "Not enough XP" });
    }
    
    // Update user document
    const result = await db.collection("Users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $addToSet: { unlockedModules: moduleId },
        $inc: { xp: -xpCost },
        $setOnInsert: { 
          moduleProgress: { 
            [moduleId]: { completedLevels: 0 } 
          } 
        }
      }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "Module already unlocked or user not found" });
    }
    
    res.json({ 
      success: true,
      newXp: user.xp - xpCost
    });
  } catch (error) {
    console.error("Error unlocking module:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
});
// Add this to your server.js
app.post('/api/users/add-first-module', async (req, res) => {
  try {
    const { userId, moduleId } = req.body;
    const client = await getDbClient();
    const db = client.db(dbName);
    
    // Add module to user's unlocked modules
    const result = await db.collection("Users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $addToSet: { unlockedModules: parseInt(moduleId) },
        $set: { 
          'moduleProgress': {
            [moduleId]: { completedLevels: 0 }
          },
          // Give some initial XP
          xp: 100 
        }
      }
    );
    
    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "User not found or module already added" });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error adding first module:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
});
// Auth routes (Still need Mongoose)
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err)
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});