import { NextResponse } from 'next/server';
import { connectDB } from '@/app/database';
import Video from '@/app/api/models/video';

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find();
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
