"use client";

import { SidebarFooterDefault } from "@/utils/constant";
import React from "react";
import { Button } from "../ui/button";
import LogoutButton from "../auth/logout-button";
import { useRouter } from "next/navigation";
import { Hint } from "../common/tool-tip";

const SidebarFooter = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {SidebarFooterDefault.map((item) => (
        <div key={item.id}>
          {item.name === "Sign out" ? (
            <LogoutButton key={item.id}>
              <Hint label={item.label} side="right" allignOffset={20}>
                <Button className="w-full flex justify-between bg-indigo-500 bg-opacity-20 text-indigo-300 group hover:bg-opacity-30 hover:bg-indigo-600 shadow-sm shadow-slate-950">
                  <p className="group-hover:translate-x-2 duration-300 transition-all">
                    {item.name}
                  </p>
                  <item.icon className="group-hover:-translate-x-2 duration-300 transition-all" />
                </Button>
              </Hint>
            </LogoutButton>
          ) : (
            <Hint label={item.label} side="right" allignOffset={20}>
              <Button
                onClick={() => item.path && router.push(item?.path)}
                key={item?.id}
                className="w-full flex justify-between bg-indigo-500 bg-opacity-20 text-indigo-300 group hover:bg-opacity-30 hover:bg-indigo-600 shadow-sm shadow-slate-950"
              >
                <p className="group-hover:translate-x-2 duration-300 transition-all">
                  {item.name}
                </p>
                <item.icon className="group-hover:-translate-x-2 duration-300 transition-all" />
              </Button>
            </Hint>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarFooter;
