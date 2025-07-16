import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  restrictedCountries: [String], // ISO country codes
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
