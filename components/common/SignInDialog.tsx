import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import RegisterForm from "../auth/register-form";
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
