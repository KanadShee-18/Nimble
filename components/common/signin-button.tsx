"use client";

import React from "react";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push("/auth/login")}
        className="tracking-wider group text-indigo-400"
        variant={"ghost"}
      >
        Sign In
        <LogIn className="group-hover:scale-125 duration-300 transition-all" />
      </Button>
    </div>
  );
};

export default SignInButton;
