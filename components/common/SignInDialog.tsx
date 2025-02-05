import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import React from "react";
import LoginForm from "../auth/login-form";

const SignInDialog = ({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: () => void;
}) => {
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-fit bg-transparent border-none backdrop-blur-sm">
          <DialogTitle></DialogTitle>
          <LoginForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
