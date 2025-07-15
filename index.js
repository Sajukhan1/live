import express from "express";
import cors from "cors";
import { connectDB, VideoRestriction } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => res.send("YouTube CMS Backend Running"));

// Get restrictions for video
app.get("/api/restrictions/:videoId", async (req, res) => {
  try {
    const video = await VideoRestriction.findOne({ videoId: req.params.videoId });
    if (!video) return res.json({ allowed: [], blocked: [] });
    res.json({ allowed: video.allowedCountries, blocked: video.blockedCountries });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Save/update restrictions for video
app.post("/api/restrictions/:videoId", async (req, res) => {
  try {
    const { allowedCountries = [], blockedCountries = [] } = req.body;
    const video = await VideoRestriction.findOneAndUpdate(
      { videoId: req.params.videoId },
      { allowedCountries, blockedCountries },
      { upsert: true, new: true }
    );
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
