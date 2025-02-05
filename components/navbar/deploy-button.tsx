"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import { SandboxActionContext } from "@/context/ActionContext";

const DeployButton = () => {
  const context = useContext(SandboxActionContext);

  if (!context) {
    console.error("DeployButton must be used within a SandboxActionProvider");
    return null;
  }

  const { setAction } = context;
  return (
    <div>
      <Button
        onClick={() => setAction("deploy")}
        className="bg-indigo-600 text-indigo-200 hover:bg-neutral-900 hover:text-indigo-200 group shadow-sm shadow-indigo-800"
      >
        Deploy
        <Rocket className="group-hover:-translate-y-1 group-hover:translate-x-2 duration-300 transition-all" />
      </Button>
    </div>
  );
};

export default DeployButton;
