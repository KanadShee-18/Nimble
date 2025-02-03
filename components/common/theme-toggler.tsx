"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        break;
    }
  };

  const toggleTheme = () => {
    console.log("Theme changed ...");

    switchTheme();
  };

  return (
    <div
      onClick={toggleTheme}
      className="p-3 group rounded-md bg-slate-200  text-indigo-400 shadow-sm shadow-slate-400  group flex gap-x-2 items-center hover:cursor-pointer relative"
    >
      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all group-hover:text-blue-500 dark:rotate-0 dark:scale-100 dark:text-slate-500" />
      <Sun className="w-5 h-5 rotate-0 scale-100 text-slate-600 transition-all group-hover:text-blue-500 dark:-rotate-90 dark:scale-0" />
      <p className="absolute text-sm left-full opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-300 ease-in-out text-nowrap">
        Toggle Theme
      </p>
      <span className="sr-only">Toggle Theme</span>
    </div>
  );
}
