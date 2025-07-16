// app/api/hello/route.js

export async function GET(request) {
  return new Response(JSON.stringify({
    message: "Hello from Next.js API Route!",
    success: true
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
