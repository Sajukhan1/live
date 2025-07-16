export async function GET(req, { params }) {
  return new Response(`Video ID received: ${params.videoId}`, {
    status: 200,
  });
}
