import React from "react";
import LOGO from "@/public/Images/hero-transparent.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogIn, LogOut, Sparkles } from "lucide-react";
import { currentUser } from "@/lib/auth";
import LogoutButton from "../auth/logout-button";

const NavBar = async () => {
  const user = await currentUser();
  return (
    <div className="p-4 flex justify-between items-center text-sm">
      <Image src={LOGO} alt="Nimble" quality={100} width={40} height={40} />
      <div className="flex items-center gap-x-5">
        {!user ? (
          <Button
            className="tracking-wider group text-indigo-400"
            variant={"ghost"}
          >
            Sign In
            <LogIn className="group-hover:scale-125 duration-300 transition-all" />
          </Button>
        ) : (
          <LogoutButton>
            <Button className="bg-rose-100 hover:bg-rose-500 hover:text-white">
              Sign Out
              <LogOut />
            </Button>
          </LogoutButton>
        )}
        <Button className="text-white group tracking-wider bg-indigo-500 hover:bg-blue-600">
          Get Started
          <Sparkles className="group-hover:scale-125 duration-300 transition-all" />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
