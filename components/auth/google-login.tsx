"use client";

import React from "react";
import { GoogleAuthentication } from "@/actions/google-login";
import { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
  const [errorMessageGoogle, dispatchGoogleAction] = useActionState(
    GoogleAuthentication,
    undefined
  );
  return (
    <form action={dispatchGoogleAction} className="w-full">
      <Button className="w-full" variant={"outline"}>
        <FcGoogle />
      </Button>
      <p className="text-rose-400 text-sm mt-5">{errorMessageGoogle}</p>
    </form>
  );
};

export default GoogleLogin;
