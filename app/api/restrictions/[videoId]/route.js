export async function GET(request, { params }) {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connect failed:", err);
    return new Response("Database connection failed", { status: 500 });
  }

  const { videoId } = params;

  return new Response(`📺 Received videoId: ${videoId}`, { status: 200 });
}
