"use client";

import React from "react";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Hint } from "../common/tool-tip";

const HomeButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <Hint
        label={`${pathname === "/" ? "Go to Workspace" : "Back to Home"}`}
        side="bottom"
        allignOffset={18}
      >
        <Button
          onClick={() => router.push(pathname === "/" ? "/workspace" : "/")}
          className="text-white !text-xs group tracking-wider bg-indigo-500 hover:bg-blue-600"
        >
          {pathname === "/" ? "Your Workspace" : "Back to Home"}
          <Sparkles className="group-hover:scale-125 duration-300 transition-all" />
        </Button>
      </Hint>
    </div>
  );
};

export default HomeButton;
