"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-indigo-900 fixed top-0 bg-opacity-60 rounded-xl shadow-md shadow-slate-500 w-10/12 mx-auto h-14 flex items-center justify-between px-5 mt-2 backdrop-blur-sm">
      <div className="flex gap-x-4">
        <Button
          onClick={() => toast.success("Server site components rendering.")}
          variant={"secondary"}
          className={`${
            pathname === "/server" ? "bg-blue-600" : ""
          } shadow-sm shadow-blue-500 hover:bg-indigo-600`}
        >
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button
          onClick={() => toast.success("Client site components rendering.")}
          variant={"secondary"}
          className={`${
            pathname === "/client" ? "bg-blue-600" : ""
          } shadow-sm shadow-blue-500 hover:bg-indigo-600`}
        >
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button
          onClick={() => toast.success("Update your details from here.")}
          variant={"secondary"}
          className={`${
            pathname === "/settings" ? "bg-blue-600" : ""
          } shadow-sm shadow-blue-500 hover:bg-indigo-600`}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
