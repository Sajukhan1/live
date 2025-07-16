export async function GET(request, { params }) {
  const { videoId } = params;
  return new Response(`🧩 OK: ${videoId}`, { status: 200 });
}
