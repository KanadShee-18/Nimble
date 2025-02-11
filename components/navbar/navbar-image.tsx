"use client";

import Image from "next/image";
import React from "react";
import NimbleLogo from "@/public/Images/mnl.png";
import Link from "next/link";

const NavbarImageLink = () => {
  return (
    <Link href={"/"}>
      <Image
        src={NimbleLogo}
        alt="Nimble"
        quality={100}
        width={70}
        height={70}
      />
    </Link>
  );
};

export default NavbarImageLink;
