"use client";

import React from "react";
import { GithubAuthentication } from "@/actions/github-login";
import { useActionState } from "react";
import { BsGithub } from "react-icons/bs";

import { Button } from "@/components/ui/button";

const GithubLogin = () => {
  const [errorMessageGithub, dispatchGithubAction] = useActionState(
  GithubAuthentication,
    undefined
  );
  return (
    <form action={dispatchGithubAction} className="w-full">
      <Button className="w-full" variant={"outline"}>
        <BsGithub />
      </Button>
      <p>{errorMessageGithub}</p>
    </form>
  );
};

export default GithubLogin;
