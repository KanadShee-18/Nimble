"use client";

import { MessageContext } from "@/context/MessageContext";
import {
  UserDetailsContext,
  useUserDetails,
} from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight, Link } from "lucide-react";

interface Message {
  role: "user"; // Add more roles if needed
  content: string;
}

export interface UserProps {
  userName: string | null | undefined;
  userImage: string | null | undefined;
  userEmail: string | null | undefined;
}

type Messages = Message[];

const ChatSecion = ({ userName, userImage, userEmail }: UserProps) => {
  const { id } = useParams();
  console.log(id);
  const convex = useConvex();
  const [userInput, setUserInput] = useState<string>("");

  const { messages, setMessages } = useContext(MessageContext);

  const { userDetails, setUserDetails } = useUserDetails();

  useEffect(() => {
    id && GetWorkSpaceData();
  }, [id]);

  const GetWorkSpaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkSpace, {
      // @ts-ignore
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log("Workspace result: ", result);
  };

  console.log("user details in chat page: ", userDetails);

  return (
    <div className="h-[85vh] relative flex flex-col ">
      <div className="flex-1 overflow-y-scroll ">
        {/* @ts-ignore */}
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="bg-zinc-800 flex gap-2 items-center text-start tracking-wide text-sm px-3 py-2 rounded-md shadow-sm shadow-indigo-700"
          >
            {msg.role === "user" && (
              <div>
                {userImage && userImage.startsWith("http") ? (
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
            )}

            <h2>{msg?.content}</h2>
          </div>
        ))}
      </div>
      <div>
        <div className="p-[1px] bg-gradient-to-br from-indigo-700 via-slate-600 to-gray-900 rounded-xl">
          <div className="flex gap-2 bg-zinc-900 flex-col rounded-xl w-full text-zinc-400">
            <div className="flex items-start w-full justify-between p-3 gap-3 scrollbar-hide">
              <textarea
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="What do you want to build?"
                className="bg-transparent text-sm flex-1 resize-none h-20 max-h-28 outline-none scrollbar-hide font-medium tracking-wide text-indigo-300"
              />
              {userInput?.length >= 3 && (
                <ArrowRight
                  // onClick={() => onGenerate(userInput)}
                  className="bg-indigo-500 p-2 h-9 w-9 rounded-md cursor-pointer hover:bg-blue-600 shadow-md shadow-slate-950 text-white"
                />
              )}
            </div>
            <div className=" hover:bg-indigo-700 text-indigo-500 hover:text-slate-50 cursor-pointer w-fit p-2 rounded-xl hover:shadow-md hover:shadow-slate-950 transition-all duration-200">
              <Link className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSecion;
