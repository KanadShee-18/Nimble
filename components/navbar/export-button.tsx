// "use client";

// import React, { useContext } from "react";
// import { Button } from "../ui/button";
// import { Download } from "lucide-react";
// import { SandboxActionContext } from "@/context/ActionContext";

// const ExportButton = () => {
//   const { action, setAction } = useContext<any>(SandboxActionContext);
//   return (
//     <div>
//       <Button
//         onClick={() => setAction("export")}
//         className="bg-zinc-800 text-indigo-400 hover:bg-neutral-900 hover:text-indigo-200 group shadow-sm shadow-indigo-800"
//       >
//         Export
//         <Download className="group-hover:translate-y-1 duration-300 transition-all" />
//       </Button>
//     </div>
//   );
// };

// export default ExportButton;

"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { SandboxActionContext } from "@/context/ActionContext";

const ExportButton = () => {
  const context = useContext(SandboxActionContext);

  if (!context) {
    console.error("ExportButton must be used within a SandboxActionProvider");
    return null;
  }

  const { setAction } = context;

  return (
    <div>
      <Button
        onClick={() => setAction("export")}
        className="bg-zinc-800 text-indigo-400 hover:bg-neutral-900 hover:text-indigo-200 group shadow-sm shadow-indigo-800"
      >
        Export
        <Download className="group-hover:translate-y-1 duration-300 transition-all" />
      </Button>
    </div>
  );
};

export default ExportButton;
