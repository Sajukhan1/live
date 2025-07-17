import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Video from '@/models/video'; // absolute import

export async function PUT(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');
  const data = await req.json();

  if (!videoId) {
    return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
  }

  try {
    const updated = await Video.findByIdAndUpdate(
      videoId,
      {
        restrictedCountries: data.restrictedCountries || [],
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed', details: error.message }, { status: 500 });
  }
}
