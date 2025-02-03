import LoginForm from "@/components/auth/login-form";
import ThemeToggler from "@/components/common/theme-toggler";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full max-h-[100vh]">
      <div className="fixed w-3/5 -top-1/4 lg:-top-1/2 aspect-square rounded-full bg-indigo-400 opacity-25 blur-[120px]" />
      <div className="fixed w-3/5 -bottom-1/4 lg:-bottom-3/4 -right-10 aspect-square rounded-full bg-emerald-400 opacity-25 blur-[120px]" />
      <div className="relative">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
