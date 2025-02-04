"use client";

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define the full user type from Convex
export type UserType = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  image?: string;
  token?: number;
} | null;

interface UserDetailsContextProps {
  userDetails: UserType;
  setUserDetails: (user: UserType) => void;
}

export const UserDetailsContext = createContext<UserDetailsContextProps | null>(
  null
);

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserType>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userDetails");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else {
      localStorage.removeItem("userDetails");
    }
  }, [userDetails]);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }
  return context;
};
