// app/api/restrictions/[videoId]/route.js

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://newdata:anaz7U7SGJ4of3Jt@newdata.rieuzq2.mongodb.net/?retryWrites=true&w=majority&appName=newdata";

const client = new MongoClient(uri);
const dbName = "videoCMS"; // আপনার database নাম
const collectionName = "restrictions"; // আপনার collection নাম

export async function GET(request, { params }) {
  const { videoId } = params;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const restriction = await collection.findOne({ videoId });

    if (!restriction) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(restriction), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
