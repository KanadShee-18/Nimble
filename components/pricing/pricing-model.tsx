"use client";

import { PROVIDED_DEPENDENCIES } from "@/utils/constant";
import React, { useContext, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Blend } from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface PricingProps {
  name: string;
  tokens: string;
  value: number;
  desc: string;
  price: number;
}

// interface userDetailsProps {
//   email: string;
//   image: string;
//   name: string;
//   token: number;
//   uid: string;
//   _creationTime: number;
//   _id: string;
// }

const PricingModel = () => {
  const { userDetails, setUserDetails } = useContext<any>(UserDetailsContext);
  console.log("User details in pricing paypal page: ", userDetails);
  const [selectedPayment, setSelectedPayment] = useState<PricingProps>();
  const UpdateTokenForUser = useMutation(api.users.UpdateTokenUsed);
  const handlePaymentSuccess = async () => {
    const token = userDetails?.token + Number(selectedPayment?.value);
    console.log("Added token: ", token);

    await UpdateTokenForUser({
      token: token,
      userId: userDetails._id,
    });
  };

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
          {/* <Button className="my-5 w-full bg-indigo-600 text-slate-200 tracking-wide hover:text-slate-900 hover:bg-indigo-400 shadow-md shadow-slate-950">
            Upgrade to Pro
          </Button> */}
          <PayPalButtons
            onClick={() => {
              setSelectedPayment(pricing);
              console.log("Pricing token value: ", pricing.value);
            }}
            onCancel={() => console.log("Payment cancelled!")}
            onApprove={() => handlePaymentSuccess()}
            style={{
              layout: "horizontal",
              color: "gold",
              shape: "sharp",
              height: 45,
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      // @ts-ignore
                      value: pricing.price,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
