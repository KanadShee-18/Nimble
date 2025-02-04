"use client";

import { MessageContext } from "@/context/MessageContext";
import {
  UserDetailsContext,
  useUserDetails,
} from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight, Link } from "lucide-react";
import axios from "axios";
import Prompt from "@/utils/Prompt";
import ReactMarkDown from "react-markdown";
import { BeatLoader } from "react-spinners";

interface Message {
  role: "user"; // Add more roles if needed
  content: string;
}

interface AiResponse {
  aiResponse: string;
}

export interface UserProps {
  userName: string | null | undefined;
  userImage: string | null | undefined;
  userEmail: string | null | undefined;
}

type Messages = Message[];

export const CountTokenUsed = (inputText: string) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatSecion = ({ userName, userImage, userEmail }: UserProps) => {
  const { id } = useParams();
  console.log(id);
  const endRef = useRef<HTMLDivElement | null>(null);
  const convex = useConvex();
  const [userInput, setUserInput] = useState<string>("");
  const UpdateUserToken = useMutation(api.users.UpdateTokenUsed);

  const { messages, setMessages } = useContext(MessageContext);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);

  const { userDetails, setUserDetails } = useUserDetails();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    id && GetWorkSpaceData();
  }, [id]);

  const GetWorkSpaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkSpace, {
      // @ts-ignore
      workspaceId: id,
    });
    // setMessages(result?.messages);
    setMessages(Array.isArray(result?.messages) ? result.messages : []);
    console.log("Workspace result: ", result);
  };

  const onGenerate = async (input: string) => {
    //@ts-ignore
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GetAiResult();
      }
    }
  }, [messages]);

  const GetAiResult = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post<AiResponse>("/api/ai-chat", {
      prompt: PROMPT,
    });
    const aiResponse = {
      role: "ai",
      content: result.data?.aiResponse,
    };

    // @ts-ignore
    setMessages((prev) => [...prev, aiResponse]);

    await UpdateMessages({
      messages: [...messages, aiResponse],
      //@ts-ignore
      workspaceId: id,
    });

    if (userDetails?.token) {
      const token =
        userDetails?.token - Number(CountTokenUsed(JSON.stringify(aiResponse)));
      // Update the token count in convex db:
      await UpdateUserToken({
        // @ts-ignore
        userId: userDetails._id,
        token: token,
      });
    }

    setLoading(false);
  };

  console.log("In messages now messages are: ", messages);

  return (
    <div className="h-[85vh] relative flex flex-col ">
      <div className="flex-1 overflow-y-scroll ">
        {messages && Array.isArray(messages) ? (
          // @ts-ignore
          messages?.map((msg, index) => (
            <div
              key={index}
              className={`${msg.role === "user" ? "bg-zinc-800 rounded-bl-none" : "bg-[#18181b]"} flex gap-2 items-center text-start tracking-wide text-sm p-3 rounded-2xl  shadow-sm shadow-indigo-900 mb-5 relative w-[95%] ${msg.role === "ai" && "ml-auto pb-7 rounded-br-none"} leading-5`}
            >
              <div
                className={`absolute w-5 h-5 rounded-br-full   -bottom-[1px] ${msg.role === "user" ? "left-0" : "right-0"}
                ${msg.role === "user" ? "-rotate-90" : "-rotate-180"}
                  bg-gradient-to-br from-slate-900 opacity-55 to-indigo-600`}
              ></div>
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

              <ReactMarkDown
                className={`flex text-wrap overflow-hidden flex-col text-zinc-300`}
              >
                {msg.content}
              </ReactMarkDown>
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <BeatLoader className="w-20 h-auto" color="#c1ccf7" />
          </div>
        )}
        {loading && (
          <div
            className={`h-20 p-3 rounded-lg bg-zinc-800 animate-pulse relative w-11/12 mx-auto`}
          >
            <div
              className={`absolute w-5 h-5 rounded-br-full  bottom-0 right-0 -rotate-180 bg-gradient-to-br from-slate-800 to-slate-500`}
            ></div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div>
        <div className="p-[1px] bg-gradient-to-br from-indigo-700 via-slate-600 to-gray-900 rounded-xl">
          <div className="flex gap-2 bg-zinc-900 flex-col rounded-xl w-full text-zinc-400">
            <div className="flex items-start w-full justify-between p-3 gap-3 scrollbar-hide">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="What do you want to build?"
                className="bg-transparent text-sm flex-1 resize-none h-20 max-h-28 outline-none scrollbar-hide font-medium tracking-wide text-indigo-300"
              />
              {userInput?.length >= 3 && (
                <ArrowRight
                  onClick={() => onGenerate(userInput)}
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
