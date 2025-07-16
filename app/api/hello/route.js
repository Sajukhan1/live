// app/api/hello/route.js

export async function GET() {
  return new Response("🟢 Route Kaj Korche!", {
    status: 200,
  });
}
