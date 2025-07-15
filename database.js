import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Prevent multiple connections in dev or Next.js
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose;
    }).catch(err => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const videoRestrictionSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  allowedCountries: { type: [String], default: [] },
  blockedCountries: { type: [String], default: [] },
});

// Prevent model overwrite error in hot-reload
export const VideoRestriction = mongoose.models.VideoRestriction
  || mongoose.model("VideoRestriction", videoRestrictionSchema);
