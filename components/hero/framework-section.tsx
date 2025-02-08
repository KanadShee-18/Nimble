"use client";

import React from "react";
import REACT_LOGO from "@/public/Images/react-icon.png";
import ANGULAR_LOGO from "@/public/Images/angular-logo.png";
import TAILWIND_LOGO from "@/public/Images/tailwind-logo.png";
import VITE_LOGO from "@/public/Images/vite-logo.png";
import BOOTSTRAP_LOGO from "@/public/Images/bootstrap-logo.png";
import NEXT_LOGO from "@/public/Images/next-logo.png";
import Image from "next/image";
import { motion } from "motion/react";

const FrameWorks = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 100 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.5,
        delay: 2.5,
        type: "spring",
        stiffness: 70,
        damping: 40,
      }}
      className="max-w-md mt-10 flex items-center justify-center flex-col gap-y-7"
    >
      <div className="flex gap-x-5 items-center">
        <Image
          src={REACT_LOGO}
          alt="React"
          className="w-10 opacity-30 hover:opacity-75 cursor-pointer transition-opacity duration-300"
        />
        <Image
          src={NEXT_LOGO}
          alt="Next"
          className="w-10 opacity-30 hover:opacity-75 cursor-pointer bg-white rounded-full transition-opacity duration-300"
        />
        <Image
          src={ANGULAR_LOGO}
          alt="Angular"
          className="w-10 opacity-30 hover:opacity-75 cursor-pointer transition-opacity duration-300"
        />
      </div>
      <div className="flex gap-x-5 items-center">
        <Image
          src={TAILWIND_LOGO}
          alt="Tailwind"
          className="w-10 h-8 opacity-30 hover:opacity-75 cursor-pointer transition-opacity duration-300"
        />
        <Image
          src={BOOTSTRAP_LOGO}
          alt="Bootstrap"
          className="w-10 opacity-30 hover:opacity-75 cursor-pointer bg-white rounded-full transition-opacity duration-300"
        />
      </div>
      <div className="flex gap-x-5 items-center">
        <Image
          src={VITE_LOGO}
          alt="Vite"
          className="w-10 h-8 opacity-30 hover:opacity-75 cursor-pointer transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
};

export default FrameWorks;
