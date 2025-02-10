import RegisterForm from "@/components/auth/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="w-full pt-28 relative h-full">
      <div className="fixed w-3/5 h-full -top-1/4 lg:-top-1/2 aspect-square rounded-full bg-emerald-400 opacity-25 blur-[120px]" />
      <div className="fixed w-3/5  aspect-square rounded-full -bottom-1/4 lg:-bottom-3/4 -right-10 bg-indigo-400 opacity-25 blur-[120px]" />
      <div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
