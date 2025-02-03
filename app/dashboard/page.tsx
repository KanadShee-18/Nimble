import React from "react";
import { auth } from "@/auth";
import Dashboard from "@/components/dashboard/dashboard-page";

const DashboardPage = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="w-full relative bg-gray-950">
      <div className="absolute  bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="h-screen relative flex flex-col gap-y-10 items-center justify-center">
        <p className="text-5xl font-semibold bg-gradient-to-r from-slate-400 via-blue-500 to-rose-500 bg-clip-text text-transparent">
          Dashboard
        </p>
        {user && (
          <div className="space-y-6">
            <Dashboard
              id={user.id}
              name={user.name}
              email={user.email}
              image={user.image}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
