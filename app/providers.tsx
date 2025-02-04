import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/common/navbar-section";
import { MessageProvider } from "@/context/MessageContext";
import { UserDetailsProvider } from "@/context/UserDetailsContext";
import ConvexClientProvider from "./ConvexClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/sidebar-section";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <ConvexClientProvider>
        <UserDetailsProvider>
          <MessageProvider>
            <SidebarProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <AppSidebar />
                <NavBar />
                {children}
              </ThemeProvider>
            </SidebarProvider>
          </MessageProvider>
        </UserDetailsProvider>
      </ConvexClientProvider>
    </SessionProvider>
  );
};

export default Providers;
