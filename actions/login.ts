"use server";

import * as z from "zod";
import { prisma } from "@/prisma/prisma";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mailsender";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import bcrypt from "bcryptjs";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedData = LoginSchema.parse(data);
  if (!validatedData) {
    return {
      error: "Invalid input data.",
    };
  }
  const { email, password, code } = validatedData;

  const userExistance = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!userExistance || !userExistance.password || !userExistance.email) {
    return {
      error: "User not found. Register yourself first!",
    };
  }

  if (!userExistance.emailVerified) {
    const verificationToken = await generateVerificationToken(
      email,
      userExistance.id
    );

    await sendVerificationEmail({
      email: userExistance.email,
      token: verificationToken.token,
      title: "Email Confirmation - NextAuth",
      body: "Confirm your email by clicking the link below",
      type: "VERIFY",
    });
    return {
      success: "Confirmation email sent successfully!",
    };
  }

  if (userExistance.password) {
    const passwordMatched = await bcrypt.compare(
      password,
      userExistance.password
    );
    if (!passwordMatched) {
      return {
        error: "Please enter correct password!",
      };
    }
  }

  if (userExistance.isTwoFactorEnabled && userExistance.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        userExistance.email
      );
      if (!twoFactorToken) {
        return {
          error: "Invalid Code!",
        };
      }
      if (twoFactorToken.token !== code) {
        return {
          error: "Invalid Code!",
        };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return {
          error: "Two factor code has been expired!",
        };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        userExistance.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: userExistance.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      await sendVerificationEmail({
        email: twoFactorToken.email,
        token: twoFactorToken.token,
        title: "Two Factor Authentication - NextAuth",
        body: "Copy the 6-digit code below and paste it",
        type: "TWO_FA",
      });
      return {
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email: userExistance.email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Please confirm your email address and password" };
      }
    }
    throw error;
  }

  return {
    success: "User logged in successfully",
  };
};
