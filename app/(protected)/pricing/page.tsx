"use client";

import PricingModel from "@/components/pricing/pricing-model";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import constant, { PROVIDED_DEPENDENCIES } from "@/utils/constant";
import { useConvex, useQuery } from "convex/react";
import { CircleEllipsis, Droplets, Gem } from "lucide-react";
import React, { useContext } from "react";

const PricingPage = () => {
  const convex = useConvex();
  const { userDetails, setUserDetails } = useContext<any>(UserDetailsContext);
  const getUserByEmail = useQuery(
    api.users.getUser,
    userDetails ? { email: userDetails.email } : "skip"
  );
  console.log("user details in pricing page: ", getUserByEmail);

  return (
    <div className="pt-32 flex flex-col items-center justify-start w-full h-screen gap-y-3">
      <div className="w-3/4 h-3/4 fixed bottom-0 left-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 z-[-1] rounded-full opacity-15 blur-[200px]" />
      <h1 className="text-5xl font-semibold text-zinc-300">PRICING</h1>
      <p className="text-center max-w-xl text-zinc-500 font-medium">
        {PROVIDED_DEPENDENCIES.PRICING_DESC}
      </p>

      <div className="flex items-center mx-auto p-5 border-[1px] border-indigo-950 w-10/12 lg:w-3/4 justify-between rounded-2xl text-sm text-zinc-400 bg-zinc-900">
        <h2 className="flex items-center gap-2 hover:text-indigo-500 cursor-pointer font-medium">
          <Droplets className="w-4 h-4" />
          {getUserByEmail?.token} tokens left
        </h2>
        <div className="flex flex-col">
          <p className="hover:text-indigo-500 cursor-pointer flex gap-2 items-center font-medium">
            <CircleEllipsis className="w-4 h-4" />
            Need more tokens?
          </p>
          <p className="flex gap-2 items-center hover:text-indigo-500 cursor-pointer font-medium">
            <Gem className="w-4 h-4" />
            Upgrade your plan below
          </p>
        </div>
      </div>
      <div className="mx-auto w-11/12 md:w-10/12 lg:w-4/5">
        <PricingModel />
      </div>
    </div>
  );
};

export default PricingPage;
