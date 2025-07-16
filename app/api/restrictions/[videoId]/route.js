import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import { ObjectId } from 'mongodb';

// GET: Fetch restrictions for a specific video
export async function GET(req, { params }) {
  const { videoId } = params;
  const db = await connectToDatabase();

  try {
    const restriction = await db.collection('restrictions').findOne({ videoId });
    return NextResponse.json(restriction || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch restrictions' }, { status: 500 });
  }
}

// POST: Update or insert restrictions for a video
export async function POST(req, { params }) {
  const { videoId } = params;
  const db = await connectToDatabase();
  const data = await req.json();

  try {
    await db.collection('restrictions').updateOne(
      { videoId },
      { $set: { ...data, videoId } },
      { upsert: true }
    );
    return NextResponse.json({ message: 'Restrictions updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update restrictions' }, { status: 500 });
  }
}
