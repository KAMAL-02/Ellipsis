import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";
import prisma from "@/db"; 

export async function POST(req: NextRequest) {
  const { owner, repo, pull_number, feedback } = await req.json();
  const session = await getServerSession(authOptions);

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
    
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: feedback,
    });
    try {
      await prisma.comment.create({
        data: {
          userId: user.id,
          prUrl: `https://github.com/${owner}/${repo}/pull/${pull_number}`,
          feedback: feedback,
        },
      });
  
      return NextResponse.json({ message: 'Comment posted successfully', data: response.data });
    
    } catch (dbError) {
      console.log("Database operation failed, rolling back GitHub comment", dbError);
  
      await octokit.rest.issues.deleteComment({
        owner,
        repo,
        comment_id: response.data.id,
      });
  
      return NextResponse.json(
        { msg: "Failed to store comment in database" },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.log("Failed to post comment on GitHub", error);
    
    return NextResponse.json(
      { msg: "Failed to post comment on GitHub" },
      { status: 500 }
    );
  }
}