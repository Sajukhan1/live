const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in environment!");
  throw new Error('Please define the MONGODB_URI environment variable');
}
