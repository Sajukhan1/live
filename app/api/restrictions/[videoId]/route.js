import { NextResponse } from 'next/server';
import { connectDB } from '@/app/database';
import Video from '@/app/api/models/video';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { videoId } = params;
    const body = await req.json();

    const updated = await Video.findByIdAndUpdate(videoId, {
      countryRestrictions: body.countryRestrictions || []
    }, { new: true });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(_, { params }) {
  try {
    await connectDB();
    const video = await Video.findById(params.videoId);
    return NextResponse.json(video);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
