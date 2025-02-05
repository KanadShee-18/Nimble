"use client";

import { useState, createContext } from "react";

export const SandboxActionContext = createContext(null);

export const SandboxActionProvider = ({ children }) => {
  const [action, setActionState] = useState(null);

  const setAction = (newAction) => {
    setActionState(newAction);
  };

  return (
    <SandboxActionContext.Provider value={{ action, setAction }}>
      {children}
    </SandboxActionContext.Provider>
  );
};
