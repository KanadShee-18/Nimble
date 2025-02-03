import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import React from "react";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <div className="w-full max-w-md">
      <UserInfo label="Server Component" user={user} />
    </div>
  );
};

export default ServerPage;
