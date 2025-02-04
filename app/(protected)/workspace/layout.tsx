import { AppSidebar } from "@/components/sidebar/sidebar-section";
import { currentUser } from "@/lib/auth";
import React from "react";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

const WorkspaceLayout = async ({ children }: WorkspaceLayoutProps) => {
  const user = await currentUser();
  return (
    <div>
      {user && <AppSidebar />}
      {children}
    </div>
  );
};

export default WorkspaceLayout;
