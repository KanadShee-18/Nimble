"use client";

import constant from "@/utils/constant";
import { ArrowRight, Link } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const onGenerate = () => {
    
  }
  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl text-zinc-300">
        What do you want to build?
      </h2>
      <p className="text-zinc-400 font-medium">
        Prompt, run, edit, and deploy full-stack web apps.
      </p>
      <div className="p-[1px] bg-gradient-to-br from-indigo-700 via-slate-600 to-gray-900 rounded-xl">
        <div className="flex gap-2 bg-zinc-900 flex-col rounded-xl w-[500px] lg:w-[600px] text-zinc-400">
          <div className="flex items-start w-full justify-between p-5 gap-3 scrollbar-hide">
            <textarea
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="What do you want to build?"
              className="bg-transparent placeholder:text-sm flex-1 resize-none h-32 max-h-52 outline-none scrollbar-hide font-medium tracking-wide text-indigo-300"
            />
            {userInput?.length >= 3 && (
              <ArrowRight className="bg-indigo-500 p-2 h-9 w-9 rounded-md cursor-pointer hover:bg-blue-600 shadow-md shadow-slate-950 text-white" />
            )}
          </div>
          <div className="px-5 pb-5">
            <Link className="w-5 h-5 text-indigo-500" />
          </div>
        </div>
      </div>
      <div className="flex mt-5 flex-wrap items-center gap-3 justify-center w-[550px] lg:w-[700px] mx-auto">
        {constant?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            className="hover:bg-zinc-800 px-3 py-1 rounded-2xl shadow-sm shadow-slate-800 text-xs text-slate-500 hover:text-zinc-200  font-medium cursor-pointer transition-all duration-200 hover:scale-105 tracking-wide"
            key={index}
          >
            {suggestion}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Hero;
