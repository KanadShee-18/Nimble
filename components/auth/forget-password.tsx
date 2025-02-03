"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ForgetPasswordProps {
  fgtPasswordText: string;
  fgtPasswordHref: string;
}

const ForgetPassword = ({
  fgtPasswordText,
  fgtPasswordHref,
}: ForgetPasswordProps) => {
  return (
    <Button
      variant={"link"}
      asChild
      className="w-fit hover:text-blue-500 text-muted-foreground"
      size={"sm"}
    >
      <Link href={fgtPasswordHref}>{fgtPasswordText}</Link>
    </Button>
  );
};

export default ForgetPassword;
