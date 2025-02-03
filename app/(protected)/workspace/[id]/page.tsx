import ChatSecion from "@/components/workspace/chat-section";
import CodeSection from "@/components/workspace/codebox-section";
import { currentUser } from "@/lib/auth";
import React from "react";

export default async function WorkSpace() {
  const user = await currentUser();
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ChatSecion
          userName={user?.name}
          userEmail={user?.email}
          userImage={user?.image}
        />
        <div className="col-span-2">
          <CodeSection />
        </div>
      </div>
    </div>
  );
}
