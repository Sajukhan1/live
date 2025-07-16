import { connectDB, VideoRestriction } from "../../../../database.js";

export async function GET(request, { params }) {
  await connectDB();

  const { videoId } = params;

  try {
    const video = await VideoRestriction.findOne({ videoId });

    if (!video) {
      return new Response(JSON.stringify({ allowed: [], blocked: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        allowed: video.allowedCountries,
        blocked: video.blockedCountries,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching restrictions:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
