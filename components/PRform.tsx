"use client";

import { useState } from "react";
import PRViewer from "./PRviewer";
import { PRFile, PRFilesResponse } from "@/types/pr";
import { toast, ToastContainer } from "react-toastify";
import { Send } from "lucide-react";
import axios from "axios";
import SummaryRenderer from "./SummaryRender";
import Heading from "./Heading";
import 'react-toastify/dist/ReactToastify.css';

export default function PRform() {
  const [owner, setOwner] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const [pullNumber, setPullNumber] = useState<string>("");
  const [prFiles, setPrFiles] = useState<PRFile[]>([])
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<PRFilesResponse>('/api/check-pr', {
        owner,
        repo,
        pull_number: pullNumber,
      })
      console.log('response data is:', response.data)
      setPrFiles(response.data.prFiles);
      setSummary(response.data.aiSummary);

      toast.success("PR fetched successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.log(`Error fetching PR:`, err)
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
        })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Heading heading={`Get PR content and its Summary`} />
    <div className="flex justify-center items-center">
    <div className="w-1/2 max-w-md mx-auto bg-transparent p-6 rounded-lg shadow-md mt-10 border border-blue-600">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="owner" className="block text-white font-semibold mb-1">
            Owner
          </label>
          <input
            type="text"
            id="owner"
            className="w-full border border-blue-400 rounded-lg px-3 py-2"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="e.g KAMAL-02"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="repo" className="block text-white font-semibold mb-1">
            Repo
          </label>
          <input
            type="text"
            id="repo"
            className="w-full border border-blue-400 rounded-lg px-3 py-2"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="e.g my-repo"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pullNumber" className="block text-white font-semibold mb-1">
            Pull Number
          </label>
          <input
            type="number"
            id="pullNumber"
            className="w-full border border-blue-400 rounded-lg px-3 py-2"
            value={pullNumber}
            onChange={(e) => setPullNumber(e.target.value)}
            placeholder="e.g 42"
            required
          />
        </div>

        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="mt-4 w-32 flex items-center justify-center bg-black bg-opacity-10 hover:bg-opacity-20 text-white border border-sky-400 backdrop-blur-lg transition-all duration-300 ease-in-out py-2 rounded-lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit
          </button>
        </div>
      </form>
      </div>
      <SummaryRenderer summary = {summary} loading={loading} />
      </div>
      {prFiles.length > 0 && (
        <div className="mt-8">
          <PRViewer prFiles={prFiles} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
