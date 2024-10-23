import {GitBranch} from "lucide-react"

export default function Heading() {
  return (
    <div className="flex items-center justify-center my-3">
      <div className="mr-4">
        <GitBranch className="text-white w-10 h-10 mt-1"/>
      </div>
      <h1 className="text-lg md:text-4xl font-bold text-white">
      Get PR content, its Summary and Analysis
      </h1>
    </div>
  );
}
