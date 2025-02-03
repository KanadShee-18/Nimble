import React from "react";
import LOGO from "@/public/Images/hero-transparent.png";
import Image from "next/image";
import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={LOGO} alt="Nimble" quality={100} width={40} height={40} />
      <div className="flex items-center gap-x-5">
        <Button className="tracking-wider text-indigo-400" variant={"ghost"}>
          Sign In
        </Button>
        <Button className="text-white tracking-wider bg-indigo-500 hover:bg-blue-600">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
