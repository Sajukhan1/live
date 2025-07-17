import clientPromise from "@/lib/database";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("newdata"); // database name
    const collection = db.collection("restrictions");

    const videoId = params.videoId;
    const doc = await collection.findOne({ videoId });

    return Response.json({ restrictions: doc?.countries || [] });
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
