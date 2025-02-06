import Hero from "@/components/hero/hero-section";
import { currentUser } from "@/lib/auth";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#0e0e17_1px)] bg-[size:25px_25px]"></div>
      <Hero user={user} />
    </div>
  );
};

export default page;
