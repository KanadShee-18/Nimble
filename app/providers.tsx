import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/common/navbar-section";
import { MessageProvider } from "@/context/MessageContext";
import { UserDetailsProvider } from "@/context/UserDetailsContext";
import { SandboxActionProvider } from "@/context/ActionContext";
import ConvexClientProvider from "./ConvexClientProvider";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <ConvexClientProvider>
        <UserDetailsProvider>
          <MessageProvider>
            <SandboxActionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {/* <AppSidebar /> */}
                <NavBar />
                {children}
              </ThemeProvider>
            </SandboxActionProvider>
          </MessageProvider>
        </UserDetailsProvider>
      </ConvexClientProvider>
    </SessionProvider>
  );
};

export default Providers;
