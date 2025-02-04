"use client";

import { SidebarFooterDefault } from "@/utils/constant";
import React from "react";
import { Button } from "../ui/button";

const SidebarFooter = () => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {SidebarFooterDefault.map((item) => (
        <Button
          key={item?.id}
          className="w-full flex justify-between bg-indigo-500 bg-opacity-20 text-indigo-300 group hover:bg-opacity-30 hover:bg-indigo-600 shadow-sm shadow-slate-950"
        >
          <p className="group-hover:translate-x-2 duration-300 transition-all">
            {item.name}
          </p>
          <item.icon className="group-hover:-translate-x-2 duration-300 transition-all" />
        </Button>
      ))}
    </div>
  );
};

export default SidebarFooter;
