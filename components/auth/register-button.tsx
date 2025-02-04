"use client";

import React from "react";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const RegisterButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push("/auth/register")}
        className="text-white group tracking-wider bg-indigo-500 hover:bg-blue-600"
      >
        Get Started
        <Sparkles className="group-hover:scale-125 duration-300 transition-all" />
      </Button>
    </div>
  );
};

export default RegisterButton;
