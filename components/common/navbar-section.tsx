import React from "react";
import Image from "next/image";
import { currentUser } from "@/lib/auth";
import NimbleLogo from "@/public/Images/mnl.png";
import ResponsiveMenu from "./nav-controller-buttons";

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
      {/* <div className="relative">
        <div className="flex absolute items-center gap-x-3">
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
      </div> */}

      <ResponsiveMenu user={user} />
    </div>
  );
};

export default NavBar;
