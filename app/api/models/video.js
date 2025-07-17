// models/video.js
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    restrictedCountries: {
      type: [String], // e.g., ["BD", "IN", "US"]
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Avoid model overwrite error in dev with hot reloading
const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);
export default Video;
