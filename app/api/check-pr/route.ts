import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(req: NextRequest) {
  const { owner, repo, pull_number } = await req.json();
  try {
    const prFilesResponse = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });

    const prFiles = prFilesResponse.data;

    return NextResponse.json({ prFiles });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: "Failed to get the PR" }, { status: 500 });
  }
}
