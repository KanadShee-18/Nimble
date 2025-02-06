"use client";

import { UserDetailsContext } from "@/context/UserDetailsContext";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  ArrowDownAZ,
  ArrowDownZA,
  ChartPie,
  LayoutList,
  Logs,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { Hint } from "@/components/common/tool-tip";

const Page = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const GetWorkSpaces = useQuery(api.workspace.GetAllWorkspaces, {
    userId: userDetails?._id,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [originalWorkSpaces, setOriginalWorkSpaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    if (GetWorkSpaces) {
      setWorkSpaces(GetWorkSpaces);
      setOriginalWorkSpaces(GetWorkSpaces);
    }
  }, [GetWorkSpaces]);

  const applyFilter = (type) => {
    let sortedWorkspaces = [...originalWorkSpaces];

    if (type === "recent") {
      sortedWorkspaces.sort((a, b) => b._creationTime - a._creationTime);
    } else if (type === "asc") {
      sortedWorkspaces.sort((a, b) =>
        a.messages?.[0]?.content?.localeCompare(b.messages?.[0]?.content)
      );
    } else if (type === "desc") {
      sortedWorkspaces.sort((a, b) =>
        b.messages?.[0]?.content?.localeCompare(a.messages?.[0]?.content)
      );
    }

    setWorkSpaces(sortedWorkspaces);
    setActiveFilter(type);
  };

  const resetFilter = () => {
    setWorkSpaces(originalWorkSpaces);
    setActiveFilter(null);
  };

  return (
    <div className="w-full h-screen flex items-center flex-col p-10 pt-32">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#0e0e17_1px)] bg-[size:25px_25px]"></div>
      <div className="w-3/4 h-3/4 fixed top-0 right-0 bg-gradient-to-br from-green-700 via-indigo-700 to-slate-700  rounded-full opacity-30 blur-[240px]" />
      <h2 className="text-4xl font-semibold text-indigo-300 flex items-center justify-center gap-x-3">
        <LayoutList className="w-10 h-10" />
        Your Projects
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-row gap-x-3 my-10 relative">
        <Hint label="See Filters" side="top">
          <Button
            onClick={() => setShowFilters((prev) => !prev)}
            className="bg-indigo-700 text-zinc-200 tracking-wider"
            variant="outline"
          >
            <SlidersHorizontal />
            Filters
          </Button>
        </Hint>

        {showFilters && (
          <motion.div
            className="flex flex-row gap-x-3"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100 }}
            transition={{ type: "spring", stiffness: 60 }}
          >
            {/* Recent Button */}

            <Hint label="See recent projects" side="bottom">
              <Button
                className={`hover:bg-slate-600  text-zinc-400 flex items-center gap-2 ${activeFilter === "recent" ? "bg-indigo-700 text-indigo-200" : ""}`}
                variant="outline"
                onClick={() =>
                  activeFilter === "recent"
                    ? resetFilter()
                    : applyFilter("recent")
                }
              >
                Recent <ChartPie />
                {activeFilter === "recent" && (
                  <X className="w-4 h-4 cursor-pointer" />
                )}
              </Button>
            </Hint>

            {/* Ascending Button */}
            <Hint label="Sorted (A -> Z)" side="bottom">
              <Button
                className={`hover:bg-slate-600 text-zinc-400 flex items-center gap-2 ${activeFilter === "asc" ? "bg-indigo-700 text-indigo-200" : ""}`}
                variant="outline"
                onClick={() =>
                  activeFilter === "asc" ? resetFilter() : applyFilter("asc")
                }
              >
                Ascending <ArrowDownAZ />
                {activeFilter === "asc" && (
                  <X className="w-4 h-4 cursor-pointer" />
                )}
              </Button>
            </Hint>

            {/* Descending Button */}
            <Hint label="Sorted (Z -> A)" side="bottom">
              <Button
                className={`hover:bg-slate-600 text-zinc-400 flex items-center gap-2 ${activeFilter === "desc" ? "bg-indigo-700 text-indigo-200" : ""}`}
                variant="outline"
                onClick={() =>
                  activeFilter === "desc" ? resetFilter() : applyFilter("desc")
                }
              >
                Descending <ArrowDownZA />
                {activeFilter === "desc" && (
                  <X className="w-4 h-4 cursor-pointer" />
                )}
              </Button>
            </Hint>
          </motion.div>
        )}
      </div>

      {/* Workspaces List */}
      <div className="mx-auto w-screen overflow-hidden">
        {workSpaces && Array.isArray(workSpaces) ? (
          <div className="flex flex-wrap gap-3 max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            {workSpaces?.map((workSpace, index) => {
              const timestamp = Math.floor(workSpace?._creationTime || 0);
              const date = new Date(timestamp);
              const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}/${date.getFullYear()}`;

              return (
                <Link
                  href={`/workspace/${workSpace?._id}`}
                  key={index}
                  className={`w-[190px] backdrop-blur-sm aspect-square overflow-scroll scrollbar-hide my-2 text-left bg-gradient-to-br from-slate-900 to-indigo-950 p-4 text-base rounded-lg bg-opacity-15 text-zinc-400 hover:text-zinc-200 tracking-wide gap-2 hover:bg-opacity-70  hover:bg-indigo-600 cursor-pointer group duration-300 transition-all shadow-md shadow-slate-950 hover:scale-95 flex flex-col`}
                >
                  <p className="text-xs tracking-wider text-yellow-500 drop-shadow-xl mt-1 text-right">
                    DATE: {formattedDate}
                  </p>
                  <span className="flex gap-2 text-indigo-400 items-center">
                    <Logs className="!w-5 !h-5" />
                    <p className="text-nowrap">
                      {workSpace?.messages?.[0]?.content?.slice(0, 12) + "..."}
                    </p>
                  </span>
                  <Separator />
                  <p className="text-sm">{workSpace?.messages?.[0]?.content}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-zinc-300">No Projects Found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
