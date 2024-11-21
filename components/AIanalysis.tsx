import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import Loader from "./Loader";

interface AIAnalysisProps {
  analysisText: string;
  loading: boolean;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysisText, loading }) => {
  return (
    <div className="flex items-center justify-center h-80 w-full lg:w-1/2 mt-4 lg:mt-0 p-4 text-white">
      {loading ? (
        <Loader />
      ) : analysisText ? (
        <div className="prose prose-invert w-full max-h-96 overflow-y-auto p-4 outline-none">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            className="prose prose-invert w-full"
          >
            {analysisText}
          </ReactMarkdown>
        </div>
      ) : (
        <h3 className="text-lg font-semibold">AI Analysis will appear here.</h3>
      )}
    </div>
  );
};

export default AIAnalysis;
