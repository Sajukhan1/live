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
      type: [String], // ISO codes: e.g., "BD", "US"
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Prevent model overwrite in development
export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
