"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/prisma";
import { getPassworResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/schemas";

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordSchema>
) => {
  try {
    const validatedFields = ResetPasswordSchema.parse(data);
    if (!validatedFields) {
      return {
        error: "Inputs are not valid.",
      };
    }
    const { token, password, confirmNewPassword } = validatedFields;
    if (password !== confirmNewPassword) {
      return {
        error: "Both passwords should be matched!",
      };
    }
    if (!token) {
      return {
        error: "Token is required!",
      };
    }

    const existingPasswordToken = await getPassworResetTokenByToken(token);
    if (!existingPasswordToken) {
      return {
        error: "Token is not exist!",
      };
    }
    const hasExpired = new Date(existingPasswordToken.expires) < new Date();

    if (hasExpired) {
      return {
        error: "Token has been expired!",
      };
    }
    const existingUser = await getUserByEmail(existingPasswordToken.email);
    if (!existingUser) {
      return {
        error: "User not exists.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.passwordResetToken.delete({
      where: {
        id: existingPasswordToken.id,
      },
    });
    return {
      success: "Password has been reset successfully!",
    };
  } catch (error) {
    return {
      error: "Something went wrong while resetting password.",
    };
  }
};
