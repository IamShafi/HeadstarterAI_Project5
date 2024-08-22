import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  // Extract JSON data from the request body
  const ratingData = await req.json();
  try {
    // Initialize the OpenAI & Pinecone client with the API key from environment variables
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const openai = new OpenAI();
    // Define the Pinecone index and namespace to use for storing the data
    const index = pc.index("").namespace("");
    const prompt = `Professor ${ratingData.professorName} teaches ${ratingData.subject}.Overall rating: ${ratingData.overallRating}/5. Review: ${ratingData.review}`;

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: prompt,
      encoding_format: "float",
    });

    // Insert into Pinecone
    const upsertResponse = await index.upsert([
      {
        id: `${ratingData.professorName
          .replace(/\s+/g, "_")
          .toLowerCase()}_${Date.now()}`,
        values: embedding.data[0].embedding,
        metadata: {
          ...ratingData,
          type: "professor_rating",
        },
      },
    ]);

    console.log("Upsert response:", upsertResponse);
    return NextResponse.json({
      message: `Rating for ${ratingData.professorName} added successfully`,
    });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: "An error occurred in submitting rating", details: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
      }
  }
}
