"use server";

import { prisma } from "@/prisma/prisma";
import { getVerificationTokenByToken } from "@/data/verification-tokens";
import { getUserById } from "@/data/user";

export const verifyEmailToken = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return {
        error: "Token does not exist!",
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return {
        error: "Token has been expired!",
      };
    }

    const existingUser = await getUserById(existingToken.userId);

    if (!existingUser) {
      return {
        error: "User doesn't exist",
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Email has been verified!",
    };
  } catch (error) {
    return {
      error: "Some error occurred while verifying the email.",
    };
  }
};
