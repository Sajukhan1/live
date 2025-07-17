// models/video.js
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    restrictedCountries: {
      type: [String], // ISO country codes (e.g., "BD", "IN", "US")
      default: [],
    },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt
  }
);

// Prevent model overwrite issue in development
export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
