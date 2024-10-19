import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";
import prisma from "@/db"; 

export async function POST(req: NextRequest) {
  const { owner, repo, pull_number, feedback } = await req.json();
  const session = await getServerSession(authOptions);

  console.log(session);
  if (!session) {
    return NextResponse.json(
      { msg: "Unauthorized: Session not found" },
      { status: 401 }
    );
  }

  const userToken = session.accessToken;
  const userId = session.user.id;

  if (!userToken) {
    return NextResponse.json(
      { msg: "Unauthorized: No access token provided" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      githubId: String(userId),
    },
  });

  if (!user) {
    return NextResponse.json(
      { msg: "User not found in DB" },
      { status: 404 }
    );
  }

  const octokit = new Octokit({
    auth: userToken,
  });
  

  try {
    console.log('We are in try catch above comment')
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: feedback,
    });
    console.log("we are after issue create comment")
    await prisma.comment.create({
      data: {
        userId: user.id,
        prUrl: `https://github.com/${owner}/${repo}/pull/${pull_number}`,
        feedback: feedback,
      },
    })

    return NextResponse.json({ message: 'Comment posted successfully', data: response.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to post comment" },
      { status: 500 }
    );
  }
}
