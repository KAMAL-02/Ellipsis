import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, Star, Eye } from "lucide-react"

interface RepoData {
  name: string
  full_name: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
}

export default function RepositoryInfo({ repoData }: { repoData: RepoData }) {
  return (
    <div className="max-w-xs md:max-w-none">
    <Card className="bg-black border-blue-500 col-span-full lg:col-span-1">
      <CardHeader className="bg-transparent border-b-2 border-blue-500">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center">
          <GitBranch className="h-5 w-5 mr-2 text-blue-400" />
          Repository Info
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-blue-400">{repoData.name}</h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">{repoData.full_name}</p>
        <p className="text-xs sm:text-sm text-gray-300">{repoData.description}</p>
        <div className="mt-3 sm:mt-4 flex flex-wrap justify-between text-xs sm:text-sm gap-2">
          <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-400" /> {repoData.stargazers_count} Stars</span>
          <span className="flex items-center"><Eye className="h-4 w-4 mr-1 text-green-400" /> {repoData.watchers_count} Watchers</span>
          <span className="flex items-center"><GitBranch className="h-4 w-4 mr-1 text-purple-400" /> {repoData.forks_count} Forks</span>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}