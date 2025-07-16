import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  countryRestrictions: {
    type: [String], // Example: ['IN', 'US']
    default: [],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
