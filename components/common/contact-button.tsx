"use client";

import React from "react";
import { Button } from "../ui/button";
import { Contact2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ContactButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => router.push("/contact")}
        className="tracking-wider bg-slate-900 border-[1px] border-indigo-600 group text-indigo-400"
        variant={"ghost"}
      >
        Contact
        <Contact2 className="group-hover:scale-125 duration-300 transition-all" />
      </Button>
    </div>
  );
};

export default ContactButton;
