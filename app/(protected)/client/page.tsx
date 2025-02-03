"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/user-current-user";
import React, { useEffect } from "react";

const ClientPage = () => {
  const user = useCurrentUser();

  useEffect(() => {}, [user]);

  return (
    <div className="w-full max-w-md">
      <UserInfo label="Client Component" user={user} />
    </div>
  );
};

export default ClientPage;
