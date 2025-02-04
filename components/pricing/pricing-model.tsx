"use client";

import { PROVIDED_DEPENDENCIES } from "@/utils/constant";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Blend } from "lucide-react";

const PricingModel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
      {PROVIDED_DEPENDENCIES.PRICING_OPTIONS.map((pricing) => (
        <div
          key={pricing.name}
          className="border-[1px] w-[310px] mx-auto p-4 rounded-lg bg-zinc-900"
        >
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl text-nowrap font-bold text-zinc-300">
              {pricing.name}
            </h2>
            <h3 className="flex items-center text-zinc-300 font-semibold gap-2 text-sm">
              <Blend className="w-6 h-6 bg-neutral-800 rounded-full p-1 shadow-sm shadow-slate-950" />
              {pricing.tokens} tokens
            </h3>
            <h4 className="text-sm text-zinc-500">{pricing.desc}</h4>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center font-bold justify-center text-zinc-300">
            <sup className="text-xl">$</sup>
            <p className="text-4xl">{pricing.price}</p>
            <span className="mt-auto">/month</span>
          </div>
          <p className="text-center text-xs mt-3 text-zinc-500 tracking-wider font-medium">
            Billed monthly
          </p>
          <Separator className="my-4" />
          <Button className="my-5 w-full bg-indigo-600 text-slate-200 tracking-wide hover:text-slate-900 hover:bg-indigo-400 shadow-md shadow-slate-950">
            Upgrade to Pro
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
