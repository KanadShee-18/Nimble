"use client";

import { SandboxActionContext } from "@/context/ActionContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

function SandpackPreviewClient() {
  const previewRef = useRef();
  const { sandpack } = useSandpack();

  const context = useContext(SandboxActionContext);
  const { action } = context;

  const GetClientFromSandPack = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log("CLient is: ", client);
      const clientResult = await client.getCodeSandboxURL();
      console.log("Client res: ", clientResult);

      if (action?.actionType === "deploy") {
        window.open(`https://${clientResult.sandboxId}.csb.app/`);
      } else if (action?.actionType === "export") {
        window.open(`${clientResult?.editorUrl}`);
      }
    }
  };

  console.log("Action in sandbox page: ", action);

  useEffect(() => {
    GetClientFromSandPack();
  }, [sandpack, action]);

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "80vh" }}
      showNavigator={true}
    />
  );
}

export default SandpackPreviewClient;
