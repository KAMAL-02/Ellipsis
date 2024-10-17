import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(req: NextRequest) {
  const { owner, repo, pull_number, feedback } = await req.json();

  try {
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: feedback,
    });

    return NextResponse.json({ message: 'Comment posted successfully', data: response.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to post comment" },
      { status: 500 }
    );
  }
}
