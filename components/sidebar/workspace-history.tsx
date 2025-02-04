"use client";

import React, { useContext, useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { AlignLeft, FolderKanban } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const WorkspaceHistory = () => {
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
    <div className="mt-10">
      <div className="flex items-center justify-between text-zinc-300 bg-slate-500 p-3 rounded-xl bg-opacity-10">
        <h2 className="font-medium text-lg">Your Projects</h2>
        <FolderKanban className="w-5 h-5" />
      </div>
      <Separator className="bg-indigo-900 my-2" />
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
                <p className="text-nowrap">
                  {/* @ts-ignore */}
                  {workSpace?.messages?.[0]?.content?.slice(0, 12) + "..."}
                </p>
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
