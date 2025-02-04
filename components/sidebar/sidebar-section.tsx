"use client";

import Image from "next/image";
import LOGO from "@/public/Images/hero-transparent.png";
import { Button } from "../ui/button";
import { ListCollapse, MessagesSquare } from "lucide-react";
import WorkspaceHistory from "./workspace-history";
import { useState } from "react";
import SidebarFooter from "./sidebar-footer";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`fixed flex flex-col items-center justify-start top-0 left-0 z-30 pt-16 h-screen 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        w-[250px] text-white backdrop-blur-sm bg-[#212124] dark:bg-opacity-75
        transition-transform bg-opacity-35 duration-300`}
    >
      <button
        title="Toggle Sidebar"
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-20 ${
          isOpen ? " right-[-12px]" : " right-[-33px]"
        } p-1 bg-indigo-500 backdrop-blur-md bg-opacity-45 hover:bg-opacity-65 text-black rounded-full hover:text-slate-300
        active:bg-slate-400 active:text-black shadow-md shadow-slate-900 transition-transform`}
      >
        {isOpen ? (
          <ListCollapse className="w-5 h-5" />
        ) : (
          <ListCollapse className="w-5 h-5" />
        )}
      </button>
      {/* <div className="p-5">
        <Image src={LOGO} alt="nimble" quality={100} width={40} height={40} />
      </div> */}
      <div className="flex flex-col flex-1">
        <div className="p-5 mt-10">
          <Button className="bg-indigo-600 hover:bg-indigo-300 hover:text-slate-800 text-zinc-200 tracking-wide">
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
