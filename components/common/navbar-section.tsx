import React from "react";
import { currentUser } from "@/lib/auth";
import ResponsiveMenu from "./nav-controller-buttons";
import NavbarImageLink from "../navbar/navbar-image";

const NavBar = async () => {
  const user = await currentUser();

  return (
    <div className="px-4 py-1 w-full fixed top-0 flex justify-between items-center text-sm z-[100] backdrop-blur-md border-b-[1px] border-b-zinc-800">
      <NavbarImageLink />
      <ResponsiveMenu user={user} />
    </div>
  );
};

export default NavBar;
