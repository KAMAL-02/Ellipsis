import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { PRFile } from '@/types/pr';
import { summaryResponse } from "@/types/ai";
import axios from "axios";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

function preparePRTextForAI(files: PRFile[]):string {
  let prText = `This pull request modifies ${files.length} files.\n\nFile Changes:\n`;
  files.forEach(file => {
    prText += `- ${file.filename}: ${file.additions} additions, ${file.deletions} deletions (${file.status})\n`;
  });
  return prText;
}

export async function POST(req: NextRequest) {
  const { owner, repo, pull_number } = await req.json();
  try {
    const prFilesResponse = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });

    const prFiles = prFilesResponse.data;

    const prText = preparePRTextForAI(prFiles);

    const aiSummaryResponse = await axios.post<summaryResponse>('http://localhost:3000/api/ai/summarize', {
      prText
    });

    const aiSummary = aiSummaryResponse.data.summary;

    return NextResponse.json({ prFiles, aiSummary });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: "Failed to get the PR" }, { status: 500 });
  }
}
