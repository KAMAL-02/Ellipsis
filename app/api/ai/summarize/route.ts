import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request : NextRequest){
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { prText } = await request.json();
  console.log(prText);
  if (!prText) {
    return NextResponse.json({ error: "No PR details provided" }, { status: 400 });
  }

  const prompt = `Summarize the following pull request details with prefix as Summary is:\n${prText}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const summary = response.text();
    return NextResponse.json({ summary});
  } catch (error) {
    console.error('Error in POST request:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}