// live/lib/database.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('🚨 MONGODB_URI environment variable is not set');
}

let conn = null;

export async function connectToDatabase() {
  if (conn) return conn;
  conn = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB connected');
  return conn;
}
