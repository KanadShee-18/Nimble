"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import loginImg from "@/public/login.png";
import RegisterImg from "@/public/register.png";
import SettingsImg from "@/public/settings.png";
import CSImg from "@/public/cs.png";
import LoginButton from "@/components/auth/login-button";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="relative">
        <div className="w-fit text-center relative space-y-10 z-[100]">
          <div className="text-5xl md:text-6xl lg:text-8xl z-[100] font-extrabold bg-gradient-to-r from-rose-500 via-indigo-500 to-slate-400 text-transparent bg-clip-text">
            Next-Auth
          </div>
          <p className="text-center z-[100] pb-10 font-medium text-xl px-10 md:text-3xl text-transparent bg-gradient-to-r from-slate-300 via-indigo-400 to-purple-400 bg-clip-text">
            A simple authentication application using Auth.js v5
          </p>
          <LoginButton mode="modal">
            <Button
              variant={"destructive"}
              className="w-[150px] z-[100] relative bg-gradient-to-r from-indigo-600 via-indigo-800 to-slate-600 text-lg h-[45px]
            hover:scale-95 duration-300 transition-all hover:bg-gradient-to-l hover:from-indigo-600 hover:via-indigo-800 hover:to-slate-600
            "
            >
              Sign In
            </Button>
          </LoginButton>
        </div>
        <div className="absolute w-3/5 -top-10 aspect-square rounded-full bg-emerald-400 bg-opacity-30 blur-[170px] z-[40]" />
      </div>
      <div className="fixed flex w-full justify-around z-[30] top-10">
        <Image
          src={RegisterImg}
          alt="register"
          quality={100}
          className="opacity-50 w-[200px] md:w-[250px] h-auto -rotate-12"
        />
        <Image
          src={loginImg}
          alt="login"
          quality={100}
          className="opacity-50 w-[200px] md:w-[250px] h-auto rotate-12"
        />
      </div>
      <div className="fixed flex w-full justify-around z-[30] bottom-10">
        <Image
          src={SettingsImg}
          alt="register"
          quality={100}
          className="opacity-60 w-[200px] md:w-[250px] h-auto"
        />
        <Image
          src={CSImg}
          alt="clientserver"
          quality={100}
          className="opacity-50 w-[200px] md:w-[250px] h-auto"
        />
      </div>
      <div className="absolute z-[8] w-3/5 -top-1/2 aspect-square rounded-full bg-indigo-400 opacity-15 blur-[140px]" />
    </div>
  );
}
