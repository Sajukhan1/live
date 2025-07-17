// app/api/restrictions/[videoId]/route.js

import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/database';
import Video from '../../../../models/video';

export async function PUT(req, { params }) {
  await dbConnect();
  const { videoId } = params;
  const data = await req.json();

  try {
    const updated = await Video.findByIdAndUpdate(
      videoId,
      { countryRestrictions: data.countryRestrictions || [] },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed', message: error.message }, { status: 500 });
  }
}
