import { connectDB, VideoRestriction } from "@/database";

await connectDB();

export async function GET(request, { params }) {
  try {
    const videoId = params.videoId;
    const video = await VideoRestriction.findOne({ videoId });

    if (!video) {
      return new Response(
        JSON.stringify({ allowed: [], blocked: [] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        allowed: video.allowedCountries,
        blocked: video.blockedCountries,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const videoId = params.videoId;
    const body = await request.json();

    const { allowedCountries = [], blockedCountries = [] } = body;

    const video = await VideoRestriction.findOneAndUpdate(
      { videoId },
      { allowedCountries, blockedCountries },
      { upsert: true, new: true }
    );

    return new Response(
      JSON.stringify(video),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
