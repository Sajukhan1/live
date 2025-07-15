import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

const videoRestrictionSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  allowedCountries: { type: [String], default: [] },
  blockedCountries: { type: [String], default: [] },
});

export const VideoRestriction = mongoose.model("VideoRestriction", videoRestrictionSchema);
