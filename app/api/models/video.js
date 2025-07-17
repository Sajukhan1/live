// models/video.js
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  restrictedCountries: [String], // ISO country codes
});

// Prevent model overwrite issue
export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
