"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  allignOffset?: number;
}

export const Hint = ({
  label,
  children,
  align,
  side,
  sideOffset,
  allignOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={allignOffset}
          className="text-zinc-300 z-[500] bg-indigo-950 border-black shadow-md shadow-slate-950"
        >
          <p className="font-medium capitalize tracking-wider">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
