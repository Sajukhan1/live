// app/api/hello/route.js
export async function GET() {
  return new Response(JSON.stringify({ msg: "Hello API working ✅" }));
}
