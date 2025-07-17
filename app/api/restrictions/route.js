import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/database';
import Video from '../../../models/video';

// POST: Create a new video
export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const newVideo = new Video({
      title: body.title,
      url: body.url,
      restrictedCountries: body.restrictedCountries || [],
    });

    const saved = await newVideo.save();
    return NextResponse.json(saved, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to insert video', details: err.message }, { status: 500 });
  }
}

// GET: Fetch all videos
export async function GET() {
  await dbConnect();

  try {
    const videos = await Video.find();
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
