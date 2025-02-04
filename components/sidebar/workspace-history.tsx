"use client";

import React, { useContext } from "react";
import { useConvex, useQuery } from "convex/react";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { AlignLeft, FolderKanban } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useParams } from "next/navigation";

const WorkspaceHistory = () => {
  const { id } = useParams();
  const { userDetails } = useContext<any>(UserDetailsContext);

  const workSpaces = useQuery(api.workspace.GetAllWorkspaces, {
    userId: userDetails?._id,
  });

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
                href={`/workspace/${workSpace?._id}`}
                key={index}
                className={`${
                  id === workSpace._id && "bg-blue-400"
                } w-full my-2 text-left bg-indigo-900 px-3 py-2 text-sm rounded-lg bg-opacity-15 text-zinc-300 tracking-wide flex items-center gap-4 hover:bg-opacity-70 hover:bg-indigo-600 cursor-pointer group duration-300 transition-all shadow-md shadow-slate-950 hover:scale-95`}
              >
                <AlignLeft className="w-4 h-4" />
                <p className="text-nowrap">
                  {workSpace?.messages?.[0]?.content?.slice(0, 12) + "..."}
                </p>
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
