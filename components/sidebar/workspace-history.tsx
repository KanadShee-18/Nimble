"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserProps } from "../workspace/chat-section";
import { useConvex } from "convex/react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { Button } from "../ui/button";
import { AlignLeft, FolderKanban } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WorkspaceHistory = ({}: UserProps) => {
  const router = useRouter();
  const convex = useConvex();
  const { userDetails, setUserDetails } = useContext<any>(UserDetailsContext);

  const [workSpaces, setWorkSpaces] = useState([]);

  const GetAllWorkSpaces = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspaces, {
      userId: userDetails?._id,
    });
    //@ts-ignore
    setWorkSpaces(result);
  };
  console.log("All workspaces result: ", workSpaces);

  useEffect(() => {
    userDetails && GetAllWorkSpaces();
  }, [userDetails]);

  console.log("User details in workspace: ", userDetails);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-lg">Your Projects</h2>
        <FolderKanban className="w-5 h-5" />
      </div>
      <div>
        {workSpaces && Array.isArray(workSpaces) ? (
          <div>
            {workSpaces?.map((workSpace, index) => (
              <Link
                // @ts-ignore
                href={`/workspace/${workSpace?._id}`}
                key={index}
                className="w-full my-2 text-left bg-indigo-900 px-3 py-2 text-sm rounded-lg bg-opacity-45 text-zinc-300 tracking-wide flex items-center gap-4 hover:bg-opacity-70 hover:bg-indigo-600 cursor-pointer group duration-300 transition-all shadow-md shadow-slate-950 hover:scale-95"
              >
                <AlignLeft className="w-4 h-4" />
                {/* @ts-ignore */}
                <p>{workSpace?.messages?.[0]?.content?.slice(0, 15) + "..."}</p>
                {/* {workSpace?.messages?.[0].content} */}
              </Link>
            ))}
          </div>
        ) : (
          <div>No Projects Found</div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
