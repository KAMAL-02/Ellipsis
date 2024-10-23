"use client"

import { useState } from "react"
import Image from "next/image"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RepositoryInfo from "./RepositoryInfo"
import MetricCard from "./MetricCard"
import PullRequestsChart from "./PullRequestChart"
import IssuesChart from "./IssuesChart"
import ResponseTimesChart from "./ResponseTimeChart"
import { GitCommit, Users, FolderGit, User} from "lucide-react"
import { toast } from "react-toastify"

interface Metrics {
  totalCommits: number
  totalBranches: number
  branchNames: string[]
  totalContributors: number
  totalIssuesOpened: number
  totalIssuesClosed: number
  totalPRs: number
  acceptedPRs: number
  rejectedPRs: number
  responseTimes: number[]
}

interface RepoData {
  name: string
  full_name: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
}

interface ApiResponse {
  metrics: Metrics
  avgResponseTime: number
  repoData: RepoData
}

export default function GitHubMetricsDashboard() {
  const [owner, setOwner] = useState("")
  const [repo, setRepo] = useState("")
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.post<ApiResponse>(`/api/repo/metrics`,{
        owner,
        repo
      })
      setData(response.data)
    } catch (err) {
      toast.error(
        "Failed to get the repo details. Try again later",
        {
          containerId: 'GlobalApplicationToast',
        })

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-black rounded-lg bg-opacity-10 min-h-screen text-white border border-blue-500">
      <div className="flex justify-center items-center">
      <Image
        src="/Reports statistics icon.png"
        alt="Dashboard Image"
        width={100}
        height={100}
        className="mb-4"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center bg-clip-text text-white">Repository Metrics Dashboard</h1>
      </div>
      <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-gray-300">
          <User />
          <Label htmlFor="owner" className=" text-sm sm:text-base">Owner</Label>
          </div>
          <Input id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="e.g. facebook" required className="mt-1 bg-white text-black text-sm sm:text-base border border-blue-500" />
        </div>
        <div>
        <div className="flex items-center gap-2 text-gray-300">
          <FolderGit />
          <Label htmlFor="owner" className=" text-sm sm:text-base">Repository</Label>
          </div>
          <Input id="repo" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="e.g. react" required className="mt-1 bg-white border border-blue-500 text-black text-sm sm:text-base " />
        </div>
      </div>
      <div className="flex justify-center items-center">
      <Button onClick={fetchData} disabled={loading} className="w-48 mb-6 sm:mb-8 bg-transparent hover:text-opacity-80 border border-blue-500 text-white text-sm sm:text-base py-2 sm:py-3">
        {loading ? "Getting..." : "Get stats"}
      </Button>
      </div>

      {data && (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RepositoryInfo repoData={data.repoData} />
          <MetricCard title="Total Commits" value={data.metrics.totalCommits} icon={<GitCommit className="h-5 w-5 mr-2 text-green-400" />} />
          <MetricCard title="Contributors" value={data.metrics.totalContributors} icon={<Users className="h-5 w-5 mr-2 text-purple-400" />} />
          <PullRequestsChart metrics={data.metrics} />
          <IssuesChart metrics={data.metrics} />
          <ResponseTimesChart metrics={data.metrics} avgResponseTime={data.avgResponseTime} />
        </div>
      )}
    </div>
  )
}