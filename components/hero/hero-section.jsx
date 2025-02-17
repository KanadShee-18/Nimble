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
import { motion } from "motion/react";
import FrameWorks from "./framework-section";

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
      router.push("/workspace/" + workspaceId);
    }
  };

  useEffect(() => {
    if (user && openDialog) {
      setOpenDialog(false);
    }
  }, [user, openDialog]);

  return (
    <div className="flex relative mx-auto flex-col min-w-full min-h-screen items-center md:pt-48 pt-36 xl:pt-52 gap-4">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 70 }}
        transition={{ duration: 1, ease: "easeIn" }}
        viewport={{ once: true }}
        className="font-bold md:text-4xl px-4 text-2xl text-center text-indigo-100 backdrop-blur-md"
      >
        Build applications by AI with Nimble
      </motion.h2>
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.7 }}
        viewport={{ once: true }}
        className="text-zinc-400 px-2 text-center font-medium backdrop-blur-md md:text-base sm:text-sm text-xs"
      >
        Prompt, run, edit, and deploy full-stack web apps.
      </motion.p>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 1.3 }}
        viewport={{ once: true }}
        className="p-[1px] bg-gradient-to-br from-indigo-700 via-slate-600 to-gray-900 rounded-xl"
      >
        <div className="flex gap-2 bg-zinc-900 flex-col rounded-xl md:w-[500px] w-[300px] lg:w-[600px] text-zinc-400">
          <div className="flex items-start w-full justify-between p-5 gap-3 scrollbar-hide">
            <textarea
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="What do you want to build?"
              className="bg-transparent md:placeholder:text-sm placeholder:text-xs flex-1 resize-none md:h-32 text-sm md:text-base h-16 md:max-h-52 max-h-16 outline-none scrollbar-hide font-medium tracking-wide text-indigo-300"
            />
            {userInput?.length >= 3 && (
              <motion.span
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
                viewport={{ once: true }}
              >
                <ArrowRight
                  onClick={() => onGenerate(userInput)}
                  className="bg-indigo-500 p-2 md:h-9 h-7 md:w-9 w-7 rounded-md cursor-pointer hover:bg-indigo-700 shadow-md shadow-slate-950 text-white"
                />
              </motion.span>
            )}
          </div>
          <div className="m-2 hover:bg-indigo-700 text-indigo-500 hover:text-slate-50 cursor-pointer w-fit p-2 rounded-xl hover:shadow-md hover:shadow-slate-950 transition-all duration-200">
            <Link className="w-5 h-5" />
          </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 2 }}
        viewport={{ once: true }}
        className="flex mt-5 flex-wrap items-center gap-3 justify-center md:w-[550px] w-[300px] lg:w-[700px] mx-auto"
      >
        {constant?.SUGGSTIONS.map((suggestion, index) => (
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 1,
              delay: 1.5,
              type: "spring",
              stiffness: 40,
              damping: 30,
            }}
            viewport={{ once: true }}
            onClick={() => onGenerate(suggestion)}
            className="hover:bg-indigo-900 hover:bg-opacity-50 md:px-3 px-2 py-1 rounded-2xl shadow-sm shadow-slate-800 backdrop-blur-sm md:text-xs text-[9px] text-slate-400 hover:text-zinc-200 font-medium cursor-pointer transition-all duration-200 hover:scale-105 tracking-wide"
            key={index}
          >
            {suggestion}
          </motion.h2>
        ))}
      </motion.div>
      <FrameWorks />

      {/* Sign In Dialog */}
      <SignInDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default Hero;
