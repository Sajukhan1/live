import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI);
};

export { connectToDatabase };
