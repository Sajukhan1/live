// models/video.js
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  restrictedCountries: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
