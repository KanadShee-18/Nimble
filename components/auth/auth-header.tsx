"use client";

interface HeaderProps {
  headerLabel: string;
  title: string;
}

import React from "react";

const AuthHeader = ({ headerLabel, title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="md:text-3xl text-xl font-semibold text-blue-500">
        {title}
      </h1>
      <p className="text-muted-foreground md:text-sm text-xs">{headerLabel}</p>
    </div>
  );
};

export default AuthHeader;
