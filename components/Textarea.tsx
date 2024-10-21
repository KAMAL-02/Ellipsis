"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import AIAnalysis from "./AIanalysis";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



interface AiAnalysisResponse {
  result: string;
}

export default function CodeAnalyzer() {
  const [text, setText] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await axios.post<AiAnalysisResponse>("/api/ai/analyze", {
        code: text,
      });
      const analyzedText = response.data.result;
      console.log(analyzedText);
      setAnalysis(analyzedText);
      setText("");
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
      toast.error(
        "An error occurred. Please try again later",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setAnalysis(
        "An error occurred while analyzing the code. Please try again."
      );
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 p-4 lg:pr-4 lg:pt-4">
      <form onSubmit={handleSubmit} className="w-full lg:w-2/5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full lg:w-5/6 mt-4 lg:mt-9 mx-auto lg:ml-12 h-64 p-4 bg-black bg-opacity-60 backdrop-blur-lg rounded-lg border-2 border-sky-400 text-white placeholder-white placeholder-opacity-60 resize-none outline-none"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          placeholder="Enter code..."
          aria-label="textarea"
        />
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="mt-4 w-32 flex items-center justify-center bg-black bg-opacity-10 hover:bg-opacity-20 text-white border border-sky-400 backdrop-blur-lg transition-all duration-300 ease-in-out py-2 rounded-lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Analyze
          </button>
        </div>
      </form>
      <AIAnalysis analysisText={analysis} loading={loading} />
      <ToastContainer />
    </div>
  );
}
