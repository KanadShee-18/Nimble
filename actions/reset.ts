"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mailsender";

export const reset = async (data: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.parse(data);

  if (!validatedFields) {
    return {
      error: "Invalid email.",
    };
  }

  const { email } = validatedFields;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "User not exist with this email.",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendVerificationEmail({
    email: passwordResetToken.email,
    token: passwordResetToken.token,
    title: "Reset Password - NIMBLE",
    body: "Reset your password by clicking the button below",
    type: "RESET",
  });

  return {
    success: "Reset password link has been sent to your email.",
  };
};
