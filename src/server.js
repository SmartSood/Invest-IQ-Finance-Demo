import express from "express";
import mongoose from "mongoose";  // Add this back for auth routes
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { MongoClient } from "mongodb";
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
// server.js
import axios from 'axios';  // Make sure to import axios
import cors from 'cors'
import cheerio from 'cheerio';

import admin from 'firebase-admin';
dotenv.config();

const app = express();



// Middleware
app.use(express.json());
app.use(cors());








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

// Auth routes (Still need Mongoose)
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
