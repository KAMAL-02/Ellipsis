import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const { code } = await request.json();
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const prompt = `Analyze the following code for bugs and fixes and provide the best possible outcome:\n${code}`;
  try {
    const result = await model.generateContent(prompt);
    return NextResponse.json({ result: result.response.text() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze code" },
      { status: 500 }
    );
  }
}
