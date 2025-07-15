import { connectDB, VideoRestriction } from "@/database";

export async function GET(_, { params }) {
  await connectDB();

  const { videoId } = params;

  try {
    const video = await VideoRestriction.findOne({ videoId });

    return Response.json({
      allowed: video?.allowedCountries || [],
      blocked: video?.blockedCountries || [],
    });
  } catch (error) {
    console.error("❌ Error fetching restrictions:", error);
    return Response.json(
      { error: "Server error while fetching restrictions." },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  await connectDB();

  const { videoId } = params;

  try {
    const body = await request.json();
    const { allowedCountries = [], blockedCountries = [] } = body;

    const video = await VideoRestriction.findOneAndUpdate(
      { videoId },
      { allowedCountries, blockedCountries },
      { upsert: true, new: true }
    );

    return Response.json(video);
  } catch (error) {
    console.error("❌ Error saving restrictions:", error);
    return Response.json(
      { error: "Server error while saving restrictions." },
      { status: 500 }
    );
  }
}
