import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { VideoRestriction } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ YouTube CMS Backend Running");
});

// ✅ Get restrictions for a specific video
app.get("/api/restrictions/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    console.log("🔍 Fetching restrictions for videoId:", videoId);

    const video = await VideoRestriction.findOne({ videoId });

    if (!video) {
      console.log("ℹ️ No restriction found for videoId:", videoId);
      return res.json({ allowed: [], blocked: [] });
    }

    console.log("✅ Restriction found:", video);
    res.json({
      allowed: video.allowedCountries,
      blocked: video.blockedCountries,
    });
  } catch (err) {
    console.error("❌ Error fetching restrictions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Save or update restrictions for a specific video
app.post("/api/restrictions/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const { allowedCountries = [], blockedCountries = [] } = req.body;

    console.log("📝 Saving restrictions for videoId:", videoId);
    console.log("Allowed:", allowedCountries);
    console.log("Blocked:", blockedCountries);

    const video = await VideoRestriction.findOneAndUpdate(
      { videoId },
      { allowedCountries, blockedCountries },
      { upsert: true, new: true }
    );

    console.log("✅ Restriction saved/updated:", video);
    res.json(video);
  } catch (err) {
    console.error("❌ Error saving restrictions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
