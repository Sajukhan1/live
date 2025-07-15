import { NextResponse } from "next/server";
import { connectDB, VideoRestriction } from "@/database.js";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const videoId = params.videoId;

    const video = await VideoRestriction.findOne({ videoId });

    if (!video) {
      return NextResponse.json({ allowed: [], blocked: [] });
    }

    return NextResponse.json({
      allowed: video.allowedCountries,
      blocked: video.blockedCountries,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();

    const videoId = params.videoId;
    const body = await req.json();

    const { allowedCountries = [], blockedCountries = [] } = body;

    const video = await VideoRestriction.findOneAndUpdate(
      { videoId },
      { allowedCountries, blockedCountries },
      { upsert: true, new: true }
    );

    return NextResponse.json(video);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
