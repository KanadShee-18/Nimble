"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { ChartNoAxesGantt, LogOutIcon } from "lucide-react";
import LogoutButton from "../auth/logout-button";
import { useRouter } from "next/navigation";

interface UserButtonProps {
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  userImage: string | null | undefined;
}

const UserButton = ({ userEmail, userName, userImage }: UserButtonProps) => {
  const router = useRouter();
  return (
    <div className="mr-5">
      <Popover>
        <PopoverTrigger asChild>
          <div>
            {userImage?.startsWith("http") ? (
              <Image
                src={userImage}
                alt={userName || "User"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <Button className="bg-indigo-700 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-indigo-300 hover:text-slate-800 text-lg">
                {userName?.charAt(0)?.toUpperCase()}
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 mr-8 mt-5 overflow-hidden">
          <div className="space-y-3">
            <div className="flex gap-2 justify-between items-center">
              <Button className="bg-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-indigo-300 hover:text-slate-800 text-lg">
                {userName?.charAt(0)?.toUpperCase()}
              </Button>
              <div className="flex flex-col flex-wrap">
                <p className="text-sm text-indigo-200">{userName}</p>
                <p className="text-xs text-wrap truncate text-zinc-400">
                  {userEmail}
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3 flex flex-col">
              <Button
                onClick={() => router.push("/settings")}
                className="w-full group flex justify-between bg-slate-800 hover:bg-indigo-900 text-indigo-300"
              >
                <p className="group-hover:translate-x-2 duration-300 transition-all">
                  Manage
                </p>
                <ChartNoAxesGantt className="group-hover:-translate-x-2 duration-300 transition-all" />
              </Button>
              <LogoutButton>
                <Button className="w-full group flex justify-between bg-slate-800 hover:bg-indigo-900 text-indigo-300">
                  <p className="group-hover:translate-x-2 duration-300 transition-all">
                    Logout
                  </p>
                  <LogOutIcon className="group-hover:-translate-x-2 duration-300 transition-all" />
                </Button>
              </LogoutButton>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserButton;
