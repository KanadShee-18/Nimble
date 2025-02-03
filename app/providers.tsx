"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/common/navbar-section";

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NavBar />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
