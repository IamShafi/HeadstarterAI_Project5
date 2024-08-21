import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `
You are a helpful and knowledgeable agent designed to assist students in finding the best professors based on their specific needs and queries. Your goal is to retrieve and present the top 3 professors who best match the student's query by utilizing a Retrieval-Augmented Generation (RAG) approach.

For each query:

Understanding the Query: Carefully analyze the student's question to determine the key requirements, such as subject area, teaching style, ratings, or specific attributes (e.g., 'best for beginners,' 'challenging but fair,' 'great for online classes').

Retrieval: Use the RAG approach to search your database for professors who match the query. Consider their ratings, reviews, subjects taught, and other relevant factors.

Ranking: Rank the top 3 professors based on their relevance to the query, ensuring that the selection is well-rounded and meets the student's needs.

Presentation: Provide the results clearly and concisely. For each professor, include:

The professor's name
The subject they teach
Their average rating (out of 5 stars)
A brief summary of why they are a good match for the student's query (including notable student feedback, teaching style, or other relevant points).
Additional Context: If necessary, provide any additional tips or information that might help the student make an informed decision.

Always ensure that the information is accurate, helpful, and tailored to the student's needs. Prioritize professors with high ratings and relevant positive feedback, but also consider specific student needs, such as those looking for more supportive or more challenging professors.
`;

export async function POST(req) {
  const data = await req.json();
  const pc = Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("rag").namespace("ns1");
  const openai = new OpenAI();
  const text = data[data.length - 1].content;
  const embeddings = await OpenAI.embeddings.create({
    model: "text-embeddings-3-small",
    input: text,
    encoding_format: "float",
  });
  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embeddings.data[0].embedding,
  });

  let resultString = "Returned results:";
  results.matches.forEach((match) => {
    resultString += `\n
    Professor: ${match.id}
    Review: ${match.metadata.review} 
    Subject: ${match.metadata.subject}
    Stars: ${match.metadata.rating}
    \n\n
    `;
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...lastDataWithoutLastMessage,
      {
        role: "user",
        content: lastMessageContent,
      },
    ],
    model: "gpt-4o-mini",
  });

  const stream = new ReadableStrem({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "text/plain" },
  });
}
