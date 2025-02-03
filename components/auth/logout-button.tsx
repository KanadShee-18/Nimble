"use client";

import { logout } from "@/actions/logout";
import React from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const onBtnClick = async () => {
    await logout();
    router.push("/auth/login");
  };
  return (
    <span className="cursor-pointer" onClick={onBtnClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
