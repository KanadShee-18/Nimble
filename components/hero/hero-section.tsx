// "use client";

// import { useUserDetails } from "@/context/UserDetailsContext";
// import { MessageContext } from "@/context/MessageContext";
// import { useContext, useState, useEffect } from "react";
// import { ArrowRight, Link } from "lucide-react";
// import SignInDialog from "../common/SignInDialog";
// import constant from "@/utils/constant";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import uuid4 from "uuid4";

// const Hero = ({ user }: { user: any }) => {
//   const [userInput, setUserInput] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const { messages, setMessages } = useContext(MessageContext);
//   const { userDetails, setUserDetails } = useUserDetails();

//   const CreateUser = useMutation(api.users.CreateUser);

//   if (user && typeof window !== undefined) {
//     localStorage.setItem("user", JSON.stringify(user));
//   }

//   const createUser = async () => {
//     if (user) {
//       await CreateUser({
//         name: user?.name,
//         email: user?.email,
//         image: user.image ? user.image : user.name,
//         uid: uuid4(),
//       }).then((res) => {
//         console.log(res);
//       });
//     }
//   };

//   useEffect(() => {
//     user && createUser();
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       setUserDetails({
//         name: user.name,
//         email: user.email,
//       });
//     }
//   }, [user, setUserDetails]);

//   const onGenerate = (msg: string) => {
//     if (!user) {
//       setOpenDialog(true);
//       return;
//     }
//     setMessages({
//       role: "user",
//       content: msg,
//     });
//   };

//   useEffect(() => {
//     if (user && openDialog) {
//       setOpenDialog(false);
//     }
//   }, [user, openDialog]);

//   console.log("User details in context: ", userDetails);

//   return (
//     <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
//       <h2 className="font-bold text-4xl text-zinc-300">
//         What do you want to build?
//       </h2>
//       <p className="text-zinc-400 font-medium">
//         Prompt, run, edit, and deploy full-stack web apps.
//       </p>
//       <div className="p-[1px] bg-gradient-to-br from-indigo-700 via-slate-600 to-gray-900 rounded-xl">
//         <div className="flex gap-2 bg-zinc-900 flex-col rounded-xl w-[500px] lg:w-[600px] text-zinc-400">
//           <div className="flex items-start w-full justify-between p-5 gap-3 scrollbar-hide">
//             <textarea
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="What do you want to build?"
//               className="bg-transparent placeholder:text-sm flex-1 resize-none h-32 max-h-52 outline-none scrollbar-hide font-medium tracking-wide text-indigo-300"
//             />
//             {userInput?.length >= 3 && (
//               <ArrowRight
//                 onClick={() => onGenerate(userInput)}
//                 className="bg-indigo-500 p-2 h-9 w-9 rounded-md cursor-pointer hover:bg-blue-600 shadow-md shadow-slate-950 text-white"
//               />
//             )}
//           </div>
//           <div className="m-2 hover:bg-indigo-700 text-indigo-500 hover:text-slate-50 cursor-pointer w-fit p-2 rounded-xl hover:shadow-md hover:shadow-slate-950 transition-all duration-200">
//             <Link className="w-5 h-5" />
//           </div>
//         </div>
//       </div>
//       <div className="flex mt-5 flex-wrap items-center gap-3 justify-center w-[550px] lg:w-[700px] mx-auto">
//         {constant?.SUGGSTIONS.map((suggestion, index) => (
//           <h2
//             onClick={() => onGenerate(suggestion)}
//             className="hover:bg-zinc-800 px-3 py-1 rounded-2xl shadow-sm shadow-slate-800 text-xs text-slate-500 hover:text-zinc-200 font-medium cursor-pointer transition-all duration-200 hover:scale-105 tracking-wide"
//             key={index}
//           >
//             {suggestion}
//           </h2>
//         ))}
//       </div>
//       {/* Sign In Dialog */}
//       <SignInDialog
//         openDialog={openDialog}
//         closeDialog={() => setOpenDialog(false)}
//       />

//       {/* Show user details */}
//       {userDetails && (
//         <div className="text-green-500">
//           Logged in as: {userDetails.name} ({userDetails.email})
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hero;

// "use client";

// import { useUserDetails } from "@/context/UserDetailsContext";
// import { MessageContext } from "@/context/MessageContext";
// import { useContext, useState, useEffect } from "react";
// import { ArrowRight, Link } from "lucide-react";
// import SignInDialog from "../common/SignInDialog";
// import constant from "@/utils/constant";
// import { useConvex, useMutation, useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import uuid4 from "uuid4";
// import { query } from "@/convex/_generated/server";

// const Hero = ({ user }: { user: any }) => {
//   const convex = useConvex();
//   const [userInput, setUserInput] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const { messages, setMessages } = useContext(MessageContext);
//   const { userDetails, setUserDetails } = useUserDetails();

//   const CreateUser = useMutation(api.users.CreateUser);

//   // Check if user is authenticated and exists in the database
//   const isAuthenticated = async (email: string) => {
//     const existingUser = await convex.query(api.users.getUser, {
//       email: email
//     })
//     return existingUser;
//   };

//   // Store user in localStorage if they are logged in
//   useEffect(() => {
//     if (user && typeof window !== "undefined") {
//       localStorage.setItem("user", JSON.stringify(user));
//     }
//   }, [user]);

//   // Check if the user exists, create if not
//   const handleUserCreation = async () => {
//     if (user) {
//       const existingUser = await isAuthenticated(user.email);

//       if (!existingUser) {
//         // Create new user if they don't exist
//         await CreateUser({
//           name: user.name,
//           email: user.email,
//           image: user.image || user.name,
//           uid: uuid4(),
//         });
//         console.log("User created:", user);
//       }

//       // Set user details in context after checking if the user exists or was just created
//       setUserDetails({
//         name: user.name,
//         email: user.email,
//       });
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       handleUserCreation();
//     }
//   }, [user]);

//   const onGenerate = (msg: string) => {
//     if (!user) {
//       setOpenDialog(true);
//       return;
//     }
//     setMessages({
//       role: "user",
//       content: msg,
//     });
//   };

//   useEffect(() => {
//     if (user && openDialog) {
//       setOpenDialog(false);
//     }
//   }, [user, openDialog]);

//   return (
//     <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
//       <h2 className="font-bold text-4xl text-zinc-300">
//         What do you want to build?
//       </h2>
//       <p className="text-zinc-400 font-medium">
//         Prompt, run, edit, and deploy full-stack web apps.
//       </p>
//       <div className="p-[1px] bg-gradient-to-br from-indigo-700 via-slate-600 to-gray-900 rounded-xl">
//         <div className="flex gap-2 bg-zinc-900 flex-col rounded-xl w-[500px] lg:w-[600px] text-zinc-400">
//           <div className="flex items-start w-full justify-between p-5 gap-3 scrollbar-hide">
//             <textarea
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="What do you want to build?"
//               className="bg-transparent placeholder:text-sm flex-1 resize-none h-32 max-h-52 outline-none scrollbar-hide font-medium tracking-wide text-indigo-300"
//             />
//             {userInput?.length >= 3 && (
//               <ArrowRight
//                 onClick={() => onGenerate(userInput)}
//                 className="bg-indigo-500 p-2 h-9 w-9 rounded-md cursor-pointer hover:bg-blue-600 shadow-md shadow-slate-950 text-white"
//               />
//             )}
//           </div>
//           <div className="m-2 hover:bg-indigo-700 text-indigo-500 hover:text-slate-50 cursor-pointer w-fit p-2 rounded-xl hover:shadow-md hover:shadow-slate-950 transition-all duration-200">
//             <Link className="w-5 h-5" />
//           </div>
//         </div>
//       </div>
//       <div className="flex mt-5 flex-wrap items-center gap-3 justify-center w-[550px] lg:w-[700px] mx-auto">
//         {constant?.SUGGSTIONS.map((suggestion, index) => (
//           <h2
//             onClick={() => onGenerate(suggestion)}
//             className="hover:bg-zinc-800 px-3 py-1 rounded-2xl shadow-sm shadow-slate-800 text-xs text-slate-500 hover:text-zinc-200 font-medium cursor-pointer transition-all duration-200 hover:scale-105 tracking-wide"
//             key={index}
//           >
//             {suggestion}
//           </h2>
//         ))}
//       </div>
//       {/* Sign In Dialog */}
//       <SignInDialog
//         openDialog={openDialog}
//         closeDialog={() => setOpenDialog(false)}
//       />

//       {/* Show user details */}
//       {userDetails && (
//         <div className="text-green-500">
//           Logged in as: {userDetails.name} ({userDetails.email})
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hero;

"use client";

import { useUserDetails } from "@/context/UserDetailsContext";
import { MessageContext } from "@/context/MessageContext";
import { useContext, useState, useEffect } from "react";
import { ArrowRight, Link } from "lucide-react";
import SignInDialog from "../common/SignInDialog";
import constant from "@/utils/constant";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";

const Hero = ({ user }: { user: any }) => {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { messages, setMessages } = useContext(MessageContext);
  const { userDetails, setUserDetails } = useUserDetails();

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

  const onGenerate = async (input: string) => {
    if (!user) {
      setOpenDialog(true);
      return;
    }
    const msgView = {
      role: "user",
      content: input,
    };
    setMessages(msgView);
    if (userDetails) {
      const workspaceId = await CreateWorkspace({
        //@ts-ignore
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
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl text-zinc-300">
        What do you want to build?
      </h2>
      <p className="text-zinc-400 font-medium">
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

      {/* Show user details */}
      {userDetails && (
        <div className="text-green-500">
          Logged in as: {userDetails.name} ({userDetails.email}) (
          {userDetails.image}) ({userDetails.uid})
        </div>
      )}
    </div>
  );
};

export default Hero;
