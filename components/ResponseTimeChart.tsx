import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { GitPullRequest } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface Metrics {
  responseTimes: number[]
}

export default function ResponseTimesChart({ metrics, avgResponseTime }: { metrics: Metrics, avgResponseTime: number }) {
  const responseTimeData = metrics.responseTimes.map((time, index) => ({ index, time }))

  return (
    <Card className="bg-black border-blue-500 col-span-full max-w-xs md:max-w-none overflow-auto">
      <CardHeader className="bg-tranparent border-b-2 border-blue-500">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
          <GitPullRequest  className="h-5 w-5 mr-2 text-blue-400" />
          Response Times
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <ChartContainer
          config={{
            responseTime: {
              label: "Response Time",
              color: "hsl(204, 86%, 53%)",
            },
          }}
          className="h-[200px] sm:h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={responseTimeData}>
              <XAxis dataKey="index" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="time" stroke="var(--color-responseTime)" strokeWidth={2} dot={{ fill: "#fff", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-center text-gray-300">
          Average Response Time: <span className="font-bold text-blue-400">{avgResponseTime.toFixed(2)} hours</span>
        </div>
      </CardContent>
    </Card>
  )
}