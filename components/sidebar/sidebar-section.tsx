import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import LOGO from "@/public/Images/hero-transparent.png";
import { Button } from "../ui/button";
import { MessagesSquare } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image src={LOGO} alt="nimble" quality={100} width={40} height={40} />
      </SidebarHeader>
      <SidebarContent className="p-5">
        <Button>
          <MessagesSquare className="w-5 h-5"/>
          Create New Project
        </Button>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
