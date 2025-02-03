"use client";

import { createContext, useContext, useState } from "react";

// Define the MessageContext with any type
export const MessageContext = createContext<any>(undefined);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<any[]>([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
