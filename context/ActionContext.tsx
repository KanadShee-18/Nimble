"use client";

import { useState, createContext } from "react";

interface SandboxActionContextType {
  action: { actionType: string; timeStamp: number } | null;
  setAction: (action: { actionType: string; timeStamp: number }) => void;
}

export const SandboxActionContext =
  createContext<SandboxActionContextType | null>(null);

export const SandboxActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [action, setActionState] =
    useState<SandboxActionContextType["action"]>(null);

  const setAction = (newAction: { actionType: string; timeStamp: number }) => {
    setActionState(newAction);
  };

  return (
    <SandboxActionContext.Provider value={{ action, setAction }}>
      {children}
    </SandboxActionContext.Provider>
  );
};
