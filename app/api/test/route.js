// app/api/test/route.js

export const dynamic = 'force-dynamic'; // 🛡️ Ensure Vercel doesn't treat this as static

export async function GET() {
  return new Response(JSON.stringify({ message: '✅ API is working!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
