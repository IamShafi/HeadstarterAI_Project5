import { NextResponse, NextRequest } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import fetch from "node-fetch";
import { load } from "cheerio";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = load(html);

    // Extract relevant information (adjust selectors based on actual Rate My Professor HTML structure)
    const professorName = $("div.NameTitle__Name-dowf0z-0").text().trim();
    const subject = $("div.NameTitle__Title-dowf0z-1").text().trim();
    const overallRating = $("div.RatingValue__Numerator-qw8sqy-2").text().trim();
    const reviews = $("div.Comments__StyledComments-dzzyvm-0").map((_, el) => $(el).text().trim()).get();

    console.log("Scraped data:", {
      professorName,
      subject,
      overallRating,
      reviews,
    });

    if (!professorName) {
      throw new Error("Failed to scrape professor name");
    }

     // Create embedding
     const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
     const index = pc.index("").namespace("");
     const openai = new OpenAI();

    // Create a summary of the professor
    const summary = `Professor ${professorName} teaches the ${
      subject
    } with an overall rating of ${
      overallRating || "N/A"
    }. Sample reviews: ${reviews.slice(0, 3).join(" ")}`;

    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: summary,
        encoding_format: "float",
      });

      // Ensure we have a valid embedding
    if (!embedding.data || !embedding.data[0] || !embedding.data[0].embedding) {
        throw new Error("Failed to generate embedding");
      }
  
      // Insert into Pinecone
      const upsertResponse = await index.upsert([{
        id: professorName.replace(/\s+/g, '_').toLowerCase(),
        values: embedding.data[0].embedding,
        metadata: {
          professor: professorName,
          subject: subject || 'Unknown',
          overallRating: overallRating || 'N/A',
          summary
        }
      }]);
  
      console.log("Upsert response:", upsertResponse);
  
      return NextResponse.json({ message: `Professor data for ${professorName} added successfully` });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occurred:", error.message);
      return NextResponse.json(
        { error: "An error occurred", details: error.message },
        { status: 500 }
      );
    }
  }
}
