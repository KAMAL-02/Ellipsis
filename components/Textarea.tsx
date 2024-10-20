"use client"

import { useState } from "react";
import { Send } from "lucide-react";


export default function Textarea() {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted text:", text);
    //TODO Add your submit logic here
    setText("");
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-60 p-4 bg-black bg-opacity-20 backdrop-blur-lg rounded-lg border-2 border-sky-400 text-white placeholder-white placeholder-opacity-60 resize-none outline-none" 
            placeholder="Enter code..."
            aria-label="textarea"
          />
        </div>
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
    </div>
  );
}
