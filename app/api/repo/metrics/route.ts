import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(request: NextRequest) {
  const { owner, repo } = await request.json();

  try {
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    const { data: contributors } = await octokit.rest.repos.listContributors({
      owner,
      repo,
    });

    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo,
    });

    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "all",
    });

    const { data: pullRequests } = await octokit.rest.pulls.list({
      owner,
      repo,
      state: "all",
    });

    const { data: branches } = await octokit.rest.repos.listBranches({
        owner,
        repo,
      });

    const metrics = {
      totalCommits: commits.length,
      totalBranches: branches.length,
      branchNames: branches.map((branch) => branch.name),
      totalContributors: contributors.length,

      totalIssuesOpened: issues.filter((issue) => issue.state === "open")
        .length,
      totalIssuesClosed: issues.filter((issue) => issue.state === "closed")
        .length,
      totalPRs: pullRequests.length,
      acceptedPRs: pullRequests.filter(
        (pr) => pr.state === "closed" && pr.merged_at
      ).length,
      rejectedPRs: pullRequests.filter(
        (pr) => pr.state === "closed" && !pr.merged_at
      ).length,
      responseTimes: pullRequests
        .map((pr) => {
          if (pr.created_at && pr.updated_at) {
            const createdAt = new Date(pr.created_at);
            const updatedAt = new Date(pr.updated_at);
            return (
              (updatedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
            );
          }
          return null;
        })
        .filter((time) => time !== null),
    };

    const avgResponseTime =
      metrics.responseTimes.length > 0
        ? metrics.responseTimes.reduce((a, b) => a + b, 0) /
          metrics.responseTimes.length
        : 0;

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
