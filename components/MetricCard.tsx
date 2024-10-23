import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: number
  icon: ReactNode
}

export default function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className="bg-black border-blue-500 max-w-xs md:max-w-none">
      <CardHeader className="bg-transparent border-b-2 border-blue-500">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl sm:text-4xl font-bold text-green-400 mt-3 sm:mt-4">{value}</div>
      </CardContent>
    </Card>
  )
}