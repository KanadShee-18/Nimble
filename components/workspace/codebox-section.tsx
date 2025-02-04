"use client";

import { PROVIDED_DEPENDENCIES } from "@/utils/constant";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

import React, { useState } from "react";

const CodeSection = () => {
  const [activeTab, setActivetab] = useState("code");
  const [files, setFiles] = useState(PROVIDED_DEPENDENCIES.DEFAULT_FILE);
  return (
    <div>
      <div className="bg-[#181818] mb-1 w-full p-2 border rounded-md">
        <div className="flex text-sm flex-wrap shrink-0 bg-[#070707] w-fit justify-start items-center rounded-2xl">
          <h2
            onClick={() => setActivetab("code")}
            className={`cursor-pointer hover:bg-opacity-35 ${activeTab === "code" && "bg-indigo-500 bg-opacity-25  text-indigo-400 font-semibold shadow-sm shadow-slate-950"} rounded-2xl px-2 py-1 text-indigo-500 transition-all duration-300 hover:bg-slate-700`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActivetab("preview")}
            className={`cursor-pointer hover:bg-opacity-30 ${activeTab === "preview" && "bg-indigo-500 bg-opacity-25  text-indigo-400 font-semibold shadow-sm shadow-slate-950"} text-indigo-500 rounded-2xl px-2 py-1 transition-all duration-300 hover:bg-slate-700`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        files={files}
        theme={"dark"}
        template="react"
        customSetup={{
          dependencies: {
            ...PROVIDED_DEPENDENCIES.DEPENDANCY,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          {activeTab === "code" && (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          )}
          {activeTab === "preview" && (
            <SandpackPreview style={{ height: "80vh" }} showNavigator={true} />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeSection;
