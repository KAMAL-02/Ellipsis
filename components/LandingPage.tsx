import React from "react";
import { ArrowRight, Rocket, Users, BookOpen, GitBranch } from "lucide-react";
import Navbar from "./Navbar";
import Link from "next/link"; // Import Next.js Link

function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-10 bg-black/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-4xl w-full mx-4 border border-blue-500 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 tracking-tight">
            Ellipsis
          </h1>

          <p className="text-lg md:text-xl text-gray-200 text-center mb-12 leading-relaxed max-w-2xl mx-auto">
            Ellipsis allows users to analyse their Code, retrieve and analyze pull requests (PRs) from GitHub. It generates a summary and detailed analysis of the code changes, providing insights into the PR. If signed in, users can directly post the analysis as feedback on the PR. Additionally, Ellipsis offers repository statistics, helping developers gain a deeper understanding of code quality and project metrics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link href="/Analyze-code" className="group flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-white/30 hover:border-white/50">
              <Rocket className="w-5 h-5" />
              <span>Analyze code</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300" />
            </Link>

            <Link href="/PR-summary" className="group flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-white/30 hover:border-white/50">
              <GitBranch className="w-5 h-5" />
              <span>Get PR</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300" />
            </Link>

            <Link href="/Repo-stats" className="group flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-white/30 hover:border-white/50">
              <BookOpen className="w-5 h-5" />
              <span>Repo stats</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
