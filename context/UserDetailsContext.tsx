// "use client";

// import { api } from "@/convex/_generated/api";
// import { useConvex } from "convex/react";
// import { createContext, useState, useContext, ReactNode } from "react";

// type UserType = {
//   name?: string | null | undefined;
//   email?: string | null | undefined;
// } | null;

// interface UserDetailsContextProps {
//   userDetails: UserType;
//   setUserDetails: (user: UserType) => void;
// }

// export const UserDetailsContext = createContext<UserDetailsContextProps | null>(
//   null
// );

// export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
//   const [userDetails, setUserDetails] = useState<UserType>(null);

//   return (
//     <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
//       {children}
//     </UserDetailsContext.Provider>
//   );
// };

// export const useUserDetails = () => {
//   const context = useContext(UserDetailsContext);
//   if (!context) {
//     throw new Error("useUserDetails must be used within a UserDetailsProvider");
//   }
//   return context;
// };


"use client";

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { createContext, useState, useContext, ReactNode } from "react";

// Define the full user type from Convex
type UserType = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  image?: string;
} | null;

interface UserDetailsContextProps {
  userDetails: UserType;
  setUserDetails: (user: UserType) => void;
}

export const UserDetailsContext = createContext<UserDetailsContextProps | null>(
  null
);

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserType>(null);

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
