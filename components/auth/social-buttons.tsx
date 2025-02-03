"use client";

import React from "react";
import GoogleLogin from "@/components/auth/google-login";
import GithubLogin from "@/components/auth/github-login";

const Socials = () => {
  return (
    <div className="w-full">
      <hr />
      <p className="w-full my-6 text-center text-sm text-slate-300">
        Or, Sign in with
      </p>

      <div className="w-full flex gap-x-2">
        <div className="w-1/2">
          <GoogleLogin />
        </div>
        <div className="w-1/2">
          <GithubLogin />
        </div>
      </div>
    </div>
  );
};

export default Socials;
