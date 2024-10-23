import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertCircle } from "lucide-react"
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface Metrics {
  totalIssuesOpened: number
  totalIssuesClosed: number
}

export default function IssuesChart({ metrics }: { metrics: Metrics }) {
  const issueData = [
    { name: "Opened", value: metrics.totalIssuesOpened },
    { name: "Closed", value: metrics.totalIssuesClosed },
  ]

  return (
    <div className="max-w-xs md:max-w-none">
    <Card className="bg-black border-blue-500 col-span-full md:col-span-1 overflow-hidden">
      <CardHeader className="bg-transparent border-b-2 border-blue-500">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
          Issues
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 sm:pt-6">
        <ChartContainer
          config={{
            Opened: {
              label: "Opened Issues",
              color: "hsl(348, 100%, 61%)",
            },
            Closed: {
              label: "Closed Issues",
              color: "hsl(141, 76%, 48%)",
            },
          }}
          className="h-[200px] sm:h-[250px]"
        >
          <ResponsiveContainer width="auto" height="100%">
            <BarChart data={issueData} layout="vertical" margin={{ top: 5, right: 80, left: 0, bottom: 10 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{ fill: "#A0AEC0" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-Opened)">
                {issueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "hsl(348, 100%, 61%)" : "hsl(141, 76%, 48%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  )
}