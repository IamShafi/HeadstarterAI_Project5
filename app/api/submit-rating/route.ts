import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  // Extract JSON data from the request body
  const reviewData = await req.json();

  if (
    reviewData.stars < 0 ||
    reviewData.stars > 5 ||
    !reviewData.professorName ||
    !reviewData.subject ||
    !reviewData.review
  ) {
    return NextResponse.json(
      {
        error: "Invalid data",
        details:
          "Please provide a valid professor name, subject, rating, and review",
      },
      { status: 400 }
    );
  }

  try {
    // Initialize the OpenAI & Pinecone client with the API key from environment variables
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const openai = new OpenAI();

    // Create the prompt based on the review data
    const prompt = `Professor ${reviewData.professorName}, who teaches '${
      reviewData.subject
    }' with an overall rating of ${
      reviewData.stars || "N/A"
    } stars. Sample reviews: ${reviewData.review}`;

    console.log("Submit rating Prompt:", prompt);

    // Generate embedding from OpenAI
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: prompt,
      encoding_format: "float",
    });

    // Define the Pinecone index and namespace
    const index = pc.index("rag").namespace("ns1");

    // Upsert into Pinecone
    const upsertResponse = await index.upsert([
      {
        id: `${reviewData.professorName
          .replace(/\s+/g, "_")
          .toLowerCase()}_${Date.now()}`,
        values: embedding.data[0].embedding,
        metadata: {
          professorName: reviewData.professorName,
          subject: reviewData.subject,
          stars: reviewData.stars,
          reviews: reviewData.review,
          type: "professor_rating",
        },
      },
    ]);

    return NextResponse.json({
      message: `Professor ${reviewData.professorName} rated successfully`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "An error occurred in submitting rating",
          details: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
