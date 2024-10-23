import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { summaryResponse } from "@/types/ai";
import axios from "axios";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});


export async function preparePRTextForAI(owner: string, repo: string, pull_number:number): Promise<string> {
  const prResponse = await octokit.rest.pulls.get({ owner, repo, pull_number });
  const filesResponse = await octokit.rest.pulls.listFiles({ owner, repo, pull_number });

  let prText = `Title: ${prResponse.data.title}\n`;
  prText += `Description: ${prResponse.data.body || 'No description provided.'}\n\n`;
  prText += `This pull request modifies ${filesResponse.data.length} files.\n\nFile Changes:\n`;

  for (const file of filesResponse.data) {
    prText += `- ${file.filename}: ${file.additions} additions, ${file.deletions} deletions (${file.status})\n`;
    if (file.patch) {
      prText += `\nPatch for ${file.filename}:\n${file.patch}\n\n`;
    }
  }

  return prText;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { owner, repo, pull_number, option } = body;

    console.log("outside backend zod")
    const prFilesResponse = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });

    const prFiles = prFilesResponse.data;

    const prText = await preparePRTextForAI(owner, repo, pull_number);
    const code = prText;

    let aiResponse;
    if (option === 'summarize') {
      aiResponse = await axios.post<summaryResponse>('http://localhost:3000/api/ai/summarize', { prText });
    } else if (option === 'analyze') {
      aiResponse = await axios.post<summaryResponse>('http://localhost:3000/api/ai/analyze', { code });
    } else {
      throw new Error("Invalid option provided. Use 'summarize' or 'analyze'.");
    }

    if (!aiResponse || !aiResponse.data) {
      throw new Error("AI response is undefined");
    }

    const aiResult = aiResponse.data.summary || aiResponse.data.result;
    return NextResponse.json({ prFiles, aiResult });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ err: error || "Failed to process the request" }, { status: 500 });
  }
}