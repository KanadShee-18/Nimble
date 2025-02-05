import React from "react";
import LOGO from "@/public/Images/hero-transparent.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogIn, LogOut, Sparkles } from "lucide-react";
import { currentUser } from "@/lib/auth";
import LogoutButton from "../auth/logout-button";
import UserButton from "./manage-user";
import SignInButton from "./signin-button";
import HomeButton from "../auth/home-button";
import RegisterButton from "../auth/register-button";
import ExportButton from "../navbar/export-button";
import DeployButton from "../navbar/deploy-button";
import ActionButton from "../navbar/action-buttons";

const NavBar = async () => {
  const user = await currentUser();
  return (
    <div className="p-4 w-full fixed top-0 flex justify-between items-center text-sm z-[100] backdrop-blur-md border-b-[1px] border-b-zinc-800">
      <Image src={LOGO} alt="Nimble" quality={100} width={40} height={40} />
      <div className="flex items-center gap-x-5">
        {!user && <SignInButton />}
        {user ? (
          <>
            <HomeButton />
            <ActionButton />
            {/* <ExportButton /> */}
            {/* <DeployButton /> */}

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

export default NavBar;
