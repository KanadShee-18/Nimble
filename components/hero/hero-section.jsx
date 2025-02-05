"use client";

import { UserDetailsContext } from "@/context/UserDetailsContext";
import { MessageContext } from "@/context/MessageContext";
import { useContext, useState, useEffect } from "react";
import { ArrowRight, Link } from "lucide-react";
import SignInDialog from "../common/SignInDialog";
import constant from "@/utils/constant";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Hero = ({ user }) => {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { setMessages } = useContext(MessageContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const CreateUser = useMutation(api.users.CreateUser);
  const CreateWorkspace = useMutation(api.workspace.createWorkspace);

  const getUserByEmail = useQuery(
    api.users.getUser,
    user ? { email: user.email } : "skip"
  );

  useEffect(() => {
    const authenticateUser = async () => {
      if (!user) return;

      if (getUserByEmail) {
        setUserDetails(getUserByEmail);
      } else {
        const newUser = await CreateUser({
          name: user.name,
          email: user.email,
          image: user.image || user.name,
          uid: uuid4(),
        });
        setUserDetails(newUser);
      }
    };

    authenticateUser();
  }, [user, getUserByEmail, CreateUser, setUserDetails]);

  const onGenerate = async (input) => {
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (userDetails && userDetails.token < 10) {
      toast.error("You don't have enough token to generate response!");
      return;
    }
    const msgView = {
      role: "user",
      content: input,
    };
    setMessages(msgView);
    if (userDetails) {
      const workspaceId = await CreateWorkspace({
        user: userDetails?._id,
        message: [msgView],
      });
      console.log("Workspace id: ", workspaceId);
      router.push("/workspace/" + workspaceId);
    }
  };

  useEffect(() => {
    if (user && openDialog) {
      setOpenDialog(false);
    }
  }, [user, openDialog]);

  console.log("User details in context: ", userDetails);

  return (
    <div className="flex relative flex-col  w-full h-screen items-center pt-36 xl:pt-52 gap-4">
      <h2 className="font-bold text-4xl text-zinc-300 backdrop-blur-md">
        What do you want to build?
      </h2>
      <p className="text-zinc-400 font-medium backdrop-blur-md">
        Prompt, run, edit, and deploy full-stack web apps.
      </p>
      <div className="p-[1px] bg-gradient-to-br from-indigo-700 via-slate-600 to-gray-900 rounded-xl">
        <div className="flex gap-2 bg-zinc-900 flex-col rounded-xl w-[500px] lg:w-[600px] text-zinc-400">
          <div className="flex items-start w-full justify-between p-5 gap-3 scrollbar-hide">
            <textarea
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="What do you want to build?"
              className="bg-transparent placeholder:text-sm flex-1 resize-none h-32 max-h-52 outline-none scrollbar-hide font-medium tracking-wide text-indigo-300"
            />
            {userInput?.length >= 3 && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-indigo-500 p-2 h-9 w-9 rounded-md cursor-pointer hover:bg-blue-600 shadow-md shadow-slate-950 text-white"
              />
            )}
          </div>
          <div className="m-2 hover:bg-indigo-700 text-indigo-500 hover:text-slate-50 cursor-pointer w-fit p-2 rounded-xl hover:shadow-md hover:shadow-slate-950 transition-all duration-200">
            <Link className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex mt-5 flex-wrap items-center gap-3 justify-center w-[550px] lg:w-[700px] mx-auto">
        {constant?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            onClick={() => onGenerate(suggestion)}
            className="hover:bg-zinc-800 px-3 py-1 rounded-2xl shadow-sm shadow-slate-800 text-xs text-slate-500 hover:text-zinc-200 font-medium cursor-pointer transition-all duration-200 hover:scale-105 tracking-wide"
            key={index}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      {/* Sign In Dialog */}
      <SignInDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default Hero;
