"use client";

import { Button } from "../ui/button";
import { ListCollapse, MessagesSquare } from "lucide-react";
import WorkspaceHistory from "./workspace-history";
import { useState } from "react";
import SidebarFooter from "./sidebar-footer";
import { useRouter } from "next/navigation";
import { Hint } from "../common/tool-tip";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`fixed flex flex-col ${isOpen && "overflow-y-scroll"} items-center justify-start top-0 left-0 z-30 pt-16 h-screen 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        w-[250px] text-white backdrop-blur-md bg-[#212124] dark:bg-opacity-75
        transition-transform bg-opacity-35 duration-300`}
    >
      <Hint
        label={`${isOpen ? "Collapse Sidebar" : "Expand Sidebar"}`}
        side="right"
        allignOffset={18}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute top-20 ${
            isOpen ? " right-[12px]" : "right-[-33px]"
          } p-1 bg-indigo-500 backdrop-blur-md bg-opacity-45 hover:bg-opacity-65 text-black rounded-full hover:text-slate-300
        active:bg-slate-400 active:text-black shadow-md shadow-slate-900 transition-transform`}
        >
          {isOpen ? (
            <ListCollapse className="w-5 h-5" />
          ) : (
            <ListCollapse className="w-5 h-5" />
          )}
        </button>
      </Hint>

      {/* <div className="p-5">
        <Image src={LOGO} alt="nimble" quality={100} width={40} height={40} />
      </div> */}
      <div className="flex flex-col flex-1">
        <div className="p-5 mt-10">
          <Button
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-300 hover:text-slate-800 text-zinc-200 tracking-wide"
          >
            <MessagesSquare className="w-5 h-5" />
            Create New Project
          </Button>
          <div>
            <WorkspaceHistory />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-5 w-full my-10">
        <SidebarFooter />
      </div>
    </div>
  );
}
