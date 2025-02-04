import Hero from "@/components/hero/hero-section";
import { currentUser } from "@/lib/auth";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <Hero user={user} />
    </div>
  );
};

export default page;
