import ChatSecion from "@/components/workspace/chat-section";
import CodeSection from "@/components/workspace/codebox-section";
import { currentUser } from "@/lib/auth";
import React from "react";

export default async function WorkSpace() {
  const user = await currentUser();
  return (
    <div className="py-10 px-4 pt-24 h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-10 md:gap-5 gap-2">
        <div className="relative">
          <ChatSecion
            userName={user?.name}
            userEmail={user?.email}
            userImage={user?.image}
          />
        </div>
        <div className="col-span-2">
          <CodeSection />
        </div>
      </div>
    </div>
  );
}
