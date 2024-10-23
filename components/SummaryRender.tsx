import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface TextRendererProps {
  initialSummary: string;
  loading: boolean;
}

const SummaryRenderer: React.FC<TextRendererProps> = ({ initialSummary, loading }) => {
  const [summary, setSummary] = useState(initialSummary);

  useEffect(() => {
    setSummary(initialSummary);
  }, [initialSummary]);

  const handleInputChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    setSummary(event.target.innerText);
  };

  return (
    <div className="w-full lg:w-1/2 text-base font-semibold text-white mr-6 pr-2">
      {loading ? (
        <Loader />
      ) : (
        <div 
          contentEditable={true} 
          onInput={handleInputChange}
          className="prose prose-invert w-full max-h-96 overflow-y-auto p-4 outline-none"
        >
          <ReactMarkdown rehypePlugins={[rehypeHighlight]} className="prose prose-invert w-full">
            {summary}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default SummaryRenderer;
