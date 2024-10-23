import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import Loader from "./Loader";


interface AIAnalysisProps {
  analysisText: string;
  loading: boolean;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysisText, loading }) => {
  return (
    <div className="flex items-center justify-center h-80 w-full lg:w-3/5 mt-4 lg:mt-0 p-4 bg-black bg-opacity-60 backdrop-blur-lg rounded-lg border-2 border-sky-400 text-white overflow-auto">
    {loading ? (
      <Loader />
    ) : analysisText ? (
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} className="prose prose-invert w-full">
        {analysisText}
      </ReactMarkdown>
    ) : (
      <h3 className="text-lg font-semibold">AI Analysis will appear here.</h3>
    )}
  </div>

  );
};

export default AIAnalysis;
