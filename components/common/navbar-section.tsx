import React from "react";
import Image from "next/image";
import { currentUser } from "@/lib/auth";
import UserButton from "./manage-user";
import SignInButton from "./signin-button";
import HomeButton from "../auth/home-button";
import RegisterButton from "../auth/register-button";
import ActionButton from "../navbar/action-buttons";
import NimbleLogo from "@/public/Images/mnl.png";

const NavBar = async () => {
  const user = await currentUser();
  return (
    <div className="px-4 py-1 w-full fixed top-0 flex justify-between items-center text-sm z-[100] backdrop-blur-md border-b-[1px] border-b-zinc-800">
      <Image
        src={NimbleLogo}
        alt="Nimble"
        quality={100}
        width={70}
        height={70}
      />
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
