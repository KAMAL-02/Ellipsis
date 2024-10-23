"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CommentButtonProps {
  owner: string;
  repo: string;
  pull_number: string;
  feedback: string;
  option: string | null;
}

const PostButton: React.FC<CommentButtonProps> = ({
  owner,
  repo,
  pull_number,
  feedback,
  option
}) => {
  const { data: session } = useSession();
  const isSignedIn = !!session;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/post-comment", { owner, repo, pull_number, feedback });
      toast.success(
        "Comment successfully posted",
        {
          containerId: 'GlobalApplicationToast',
        })
      handleClose();
    } catch (err) {
      toast.error(
        "Failed to post comment. Please try again later",
        {
          containerId: 'GlobalApplicationToast',
        })
    } finally {
      setIsLoading(false);
    }
  };
  const isDisabled =
  !isSignedIn ||
  option === "summarize" ||
  option === null ||
  !feedback ||
  feedback.toLowerCase().startsWith("summary is");

  return (
    <div className="">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`bg-black bg-opacity-10 border border-blue-500 hover:bg-opacity-20 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-opacity duration-300 ease-in-out ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Send className="mr-2" size={18} />
        Post Analysis
      </button>

      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center transition duration-300 ease-in-out ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`bg-white border border-blue-500 p-5 rounded-lg shadow-xl max-w-md w-full transition-all duration-300 ease-in-out ${
              isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-red-500">Confirm Action</h2>
            <p className="mb-4">
              You are about to post a comment on the pull request <span className="text-blue-600 font-semibold">#{pull_number}</span> in
              the repository <span className="text-red-500 font-semibold">{owner}/{repo}</span>.
            </p>
            <p className="mb-4 font-semibold">Comment preview:</p>
            <p className="mb-4 bg-gray-100 p-2 rounded">{feedback.slice(0, 200)}{feedback.length > 100 && "..."}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClose}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostButton;
