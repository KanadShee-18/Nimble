"use client";

import NavBar from "@/components/common/navbar-section";
import ThemeToggler from "@/components/common/theme-toggler";
import Hero from "@/components/hero/hero-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <Hero />
    </div>
  );
}
