import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/(protected)/_components/navbar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="relative pt-32 w-full flex flex-col gap-y-10 items-center justify-center">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default PrivateLayout;
