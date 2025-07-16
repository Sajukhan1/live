import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Video from '../models/video';

export async function GET() {
  await dbConnect();

  try {
    const videos = await Video.find();
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
