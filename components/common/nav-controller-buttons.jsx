// "use client";

// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import SignInButton from "./signin-button";
// import ContactButton from "./contact-button";
// import HomeButton from "../auth/home-button";
// import ActionButton from "../navbar/action-buttons";
// import UserButton from "./manage-user";
// import RegisterButton from "../auth/register-button";

// const ResponsiveMenu = ({ user }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       {/* Expand Button (Visible on Small Screens) */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="lg:hidden p-1 rounded-md bg-indigo-900 text-indigo-300"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Menu (Hidden on Large Screens) */}
//       {isOpen && (
//         <div className="absolute top-12 right-0 w-64 bg-indigo-950 shadow-lg p-4 rounded-lg z-50 flex flex-col items-start gap-3">
//           <button
//             onClick={() => setIsOpen(false)}
//             className="self-end text-indigo-300"
//           >
//             <X size={24} />
//           </button>

//           {!user && (
//             <div className="w-full flex flex-col gap-y-2">
//               <SignInButton />
//               <ContactButton />
//             </div>
//           )}
//           {user ? (
//             <div className="w-full flex gap-3 items-center">
//               <HomeButton />
//               <ActionButton />
//               {/* <ExportButton /> */}
//               {/* <DeployButton /> */}
//               <UserButton
//                 userName={user.name}
//                 userEmail={user.email}
//                 userImage={user.image}
//               />
//             </div>
//           ) : (
//             <div className="w-full">
//               <RegisterButton />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Normal Layout (Visible on Large Screens) */}
//       <div className="hidden lg:flex items-center gap-x-3">
//         {!user && (
//           <>
//             <SignInButton />
//             <ContactButton />
//           </>
//         )}
//         {user ? (
//           <>
//             <HomeButton />
//             <ActionButton />
//             {/* <ExportButton /> */}
//             {/* <DeployButton /> */}
//             <UserButton
//               userName={user.name}
//               userEmail={user.email}
//               userImage={user.image}
//             />
//           </>
//         ) : (
//           <RegisterButton />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResponsiveMenu;

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import SignInButton from "./signin-button";
import ContactButton from "./contact-button";
import HomeButton from "../auth/home-button";
import ActionButton from "../navbar/action-buttons";
import UserButton from "./manage-user";
import RegisterButton from "../auth/register-button";

const ResponsiveMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events?.on("routeChangeStart", handleRouteChange);
    return () => router.events?.off("routeChangeStart", handleRouteChange);
  }, [router]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-1 mr-7 rounded-md bg-indigo-900 text-indigo-300"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-10 bg-indigo-950 shadow-lg p-4 rounded-lg z-50 flex flex-col items-start gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-indigo-300"
          >
            <X size={24} />
          </button>

          {!user && (
            <div className="w-full flex flex-col gap-y-2">
              <SignInButton />
              <ContactButton />
            </div>
          )}
          {user ? (
            <div className="w-full flex gap-3 flex-col items-start justify-center">
              <HomeButton />
              <ActionButton />
              <UserButton
                userName={user.name}
                userEmail={user.email}
                userImage={user.image}
              />
            </div>
          ) : (
            <div className="w-full">
              <RegisterButton />
            </div>
          )}
        </div>
      )}

      {/* Normal Layout (Visible on Large Screens) */}
      <div className="hidden lg:flex items-center gap-x-3">
        {!user && (
          <>
            <SignInButton />
            <ContactButton />
          </>
        )}
        {user ? (
          <>
            <HomeButton />
            <ActionButton />
            <UserButton
              userName={user.name}
              userEmail={user.email}
              userImage={user.image}
            />
          </>
        ) : (
          <RegisterButton />
        )}
      </div>
    </div>
  );
};

export default ResponsiveMenu;
