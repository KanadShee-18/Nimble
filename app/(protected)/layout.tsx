import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/(protected)/_components/navbar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default PrivateLayout;
