// live/app/api/restrictions/[videoId]/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/database';
import { ObjectId } from 'mongodb'; // Optional

export async function GET(req, { params }) {
  const db = await connectToDatabase();
  const restriction = await db.collection('restrictions').findOne({ videoId: params.videoId });
  return NextResponse.json(restriction || { allowedCountries: [], blockedCountries: [] });
}

export async function POST(req, { params }) {
  const db = await connectToDatabase();
  const data = await req.json();
  await db.collection('restrictions').updateOne(
    { videoId: params.videoId },
    { $set: { ...data, videoId: params.videoId } },
    { upsert: true }
  );
  return NextResponse.json({ ...data, videoId: params.videoId });
}
