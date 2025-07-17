// lib/database.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(MONGODB_URI).then(m => {
      return m;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
