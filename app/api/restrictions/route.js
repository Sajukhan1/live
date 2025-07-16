// app/api/restrictions/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/database';
import Video from '@/app/api/models/video';

export async function GET() {
  await connectDB();

  try {
    const videos = await Video.find();
    return NextResponse.json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
