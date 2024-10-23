import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { GitPullRequest } from "lucide-react"
import { Pie, PieChart, ResponsiveContainer } from "recharts"

interface Metrics {
  totalPRs: number
  acceptedPRs: number
  rejectedPRs: number
}

export default function PullRequestsChart({ metrics }: { metrics: Metrics }) {
  const prData = [
    { name: "Accepted", value: metrics.acceptedPRs },
    { name: "Rejected", value: metrics.rejectedPRs },
    { name: "Open", value: metrics.totalPRs - metrics.acceptedPRs - metrics.rejectedPRs },
  ]

  return (
    <Card className="bg-black border-blue-500 col-span-full md:col-span-1 max-w-xs md:max-w-none">
      <CardHeader className="bg-transparent border-b-2 border-blue-500">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
          <GitPullRequest className="h-5 w-5 mr-2 text-orange-400" />
          Pull Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <ChartContainer
          config={{
            Accepted: {
              label: "Accepted PRs",
              color: "hsl(141, 76%, 48%)",
            },
            Rejected: {
              label: "Rejected PRs",
              color: "hsl(348, 100%, 61%)",
            },
            Open: {
              label: "Open PRs",
              color: "hsl(204, 86%, 53%)",
            },
          }}
          className="h-[200px] sm:h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={prData}
                dataKey="value"
                nameKey="name"
                cx="30%"
                cy="50%"
                outerRadius="50%"
                fill="var(--color-Accepted)"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}