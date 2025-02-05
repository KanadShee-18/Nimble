"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Rocket, Download } from "lucide-react";
import { SandboxActionContext } from "@/context/ActionContext";

const ActionButton = () => {
  const context = useContext(SandboxActionContext);

  if (!context) {
    console.error("ActionButton must be used within a SandboxActionProvider");
    return null;
  }

  const { action, setAction } = context;

  const handleClick = (actionType: string) => {
    setAction({
        actionType: actionType,
        timeStamp: Date.now(),
    });
  };

  return (
    <div className="flex flex-row gap-x-4">
      <Button
        onClick={() => handleClick("export")}
        className="bg-zinc-800 text-indigo-400 hover:bg-neutral-900 hover:text-indigo-200 group shadow-sm shadow-indigo-800"
      >
        Export
        <Download className="group-hover:translate-y-1 duration-300 transition-all" />
      </Button>

      <Button
        onClick={() => handleClick("deploy")}
        className="bg-indigo-600 text-indigo-200 hover:bg-neutral-900 hover:text-indigo-200 group shadow-sm shadow-indigo-800"
      >
        Deploy
        <Rocket className="group-hover:-translate-y-1 group-hover:translate-x-2 duration-300 transition-all" />
      </Button>
    </div>
  );
};

export default ActionButton;
