"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import AuthHeader from "@/components/auth/auth-header";
import BackButton from "@/components/auth/back-button";
import ForgetPassword from "./forget-password";
import Socials from "./social-buttons";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  title: string;
  showSocials?: boolean;
  backButtonHref: string;
  fgtPasswordHref?: string | undefined;
  fgtPasswordText?: string | undefined;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  title,
  showSocials = false,
  backButtonHref,
  fgtPasswordHref = "",
  fgtPasswordText = "",
}: CardWrapperProps) => {
  return (
    <Card className="w-10/12 relative sm:w-3/4 md:w-1/2 xl:w-1/4 mx-auto min-w-[350px]">
      <CardHeader>
        <AuthHeader headerLabel={headerLabel} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex">
        <ForgetPassword
          fgtPasswordHref={fgtPasswordHref}
          fgtPasswordText={fgtPasswordText}
        />
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
