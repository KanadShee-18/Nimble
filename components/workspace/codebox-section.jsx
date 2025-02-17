"use client";

import { MessageContext } from "@/context/MessageContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { PROVIDED_DEPENDENCIES } from "@/utils/constant";
import Prompt from "@/utils/Prompt";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { CountTokenUsed } from "./chat-section";
import SandpackPreviewClient from "../code-view/SandpackPreviewClient";
import { SandboxActionContext } from "@/context/ActionContext";
import { Hint } from "../common/tool-tip";
import { toast } from "sonner";

const CodeSection = () => {
  const { id } = useParams();
  const convex = useConvex();
  const [activeTab, setActivetab] = useState("code");
  const UpdateUserToken = useMutation(api.users.UpdateTokenUsed);
  const [files, setFiles] = useState(PROVIDED_DEPENDENCIES.DEFAULT_FILE);

  const { messages } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const { action } = useContext(SandboxActionContext);

  useEffect(() => {
    if (action) {
      setActivetab("preview");
    }
  }, [action]);

  useEffect(() => {
    setActivetab("code");
  }, [id]);

  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const UpdateCode = useMutation(api.workspace.UpdateCodeFiles);

  const GenerateCode = async () => {
    try {
      setLoading(true);
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
      const result = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });

      const aiRes = result?.data;

      const mergedFiles = {
        ...PROVIDED_DEPENDENCIES.DEFAULT_FILE,

        ...aiRes?.files,
      };
      setFiles(mergedFiles);
      await UpdateCode({
        workspaceId: id,
        fileData: aiRes.files,
      });
      if (userDetails?.token) {
        const token =
          userDetails?.token - Number(CountTokenUsed(JSON.stringify(aiRes)));
        await UpdateUserToken({
          userId: userDetails._id,
          token: token,
        });
        setUserDetails((prev) => ({
          ...prev,
          token: token,
        }));
      }
      setLoading(false);
    } catch (error) {
      toast.message(
        "Some error occurred while generating the code. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  const existingCodeFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkSpace, {
      workspaceId: id,
    });
    const mergedFiles = {
      ...PROVIDED_DEPENDENCIES.DEFAULT_FILE,
      ...result?.fileData,
    };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    id && existingCodeFiles();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GenerateCode();
      }
    }
  }, [messages]);

  return (
    <div className="relative">
      <div className="bg-[#181818] mb-1 w-full p-2 border rounded-md">
        <div className="flex text-sm flex-wrap shrink-0 bg-[#070707] w-fit justify-start items-center rounded-2xl">
          <Hint label="See Code" side="top" allignOffset={20}>
            <h2
              onClick={() => setActivetab("code")}
              className={`cursor-pointer hover:bg-opacity-35 ${activeTab === "code" && "bg-indigo-500 bg-opacity-25  text-indigo-400 font-semibold shadow-sm shadow-slate-950"} rounded-2xl px-2 py-1 text-indigo-500 transition-all duration-300 hover:bg-slate-700`}
            >
              Code
            </h2>
          </Hint>
          <Hint label="See Preview" side="top" allignOffset={20}>
            <h2
              onClick={() => setActivetab("preview")}
              className={`cursor-pointer hover:bg-opacity-30 ${activeTab === "preview" && "bg-indigo-500 bg-opacity-25  text-indigo-400 font-semibold shadow-sm shadow-slate-950"} text-indigo-500 rounded-2xl px-2 py-1 transition-all duration-300 hover:bg-slate-700`}
            >
              Preview
            </h2>
          </Hint>
        </div>
      </div>
      <SandpackProvider
        files={files}
        theme={"dark"}
        template="react"
        customSetup={{
          dependencies: {
            ...PROVIDED_DEPENDENCIES.DEPENDANCY,
            tailwindcss: "^3.3.0", // Install Tailwind
            postcss: "^8.4.0",
            autoprefixer: "^10.4.0",
          },
          devDependencies: {
            "postcss-cli": "^10.1.0",
          },
        }}
        options={{
          externalResources: ["https://unpkg.com/@tailwindcss/browser@4"],
        }}
      >
        <SandpackLayout>
          {activeTab === "code" && (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor
                style={{ height: "80vh" }}
                showLineNumbers={true}
                showInlineErrors={true}
                closableTabs={true}
              />
            </>
          )}
          {activeTab === "preview" && <SandpackPreviewClient />}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 bg-gray-900 bg-opacity-50 absolute top-0 rounded-md w-full h-full gap-3 flex items-center justify-center backdrop-blur-sm">
          <BeatLoader className=" w-20 h-auto text-white" color="#c1ccf7" />
          <h2 className="text-indigo-200 text-3xl">Getting files ready ...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeSection;
