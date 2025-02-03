"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import LoginForm from "@/components/auth/login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
}

const LoginButton = ({ children, mode = "redirect" }: LoginButtonProps) => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  const handleModalToggle = () => {
    setShowDialog(!showDialog);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowDialog(false);
    }
  };

  if (mode === "modal") {
    return (
      <>
        <span onClick={handleModalToggle} className="cursor-pointer">
          {children}
        </span>
        {showDialog && (
          <div
            className="z-[1000] inset-0 fixed grid place-items-center overflow-auto bg-slate-900 bg-opacity-60 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <div className="relative w-10/12 sm:w-3/4 md:w-1/2 xl:w-1/4 mx-auto md:min-w-[350px] lg:min-w-[400px]">
              <div className="relative rounded-lg text-left">
                <button
                  onClick={handleModalToggle}
                  className="absolute z-[25] top-2 md:right-2 right-0 p-2 rounded-full hover:text-blue-500 hover:bg-blue-950"
                >
                  <MdClose size={24} />
                </button>
                <div className="z-[15]">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <span onClick={handleRedirect} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
