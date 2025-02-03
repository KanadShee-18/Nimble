import { prisma } from "@/prisma/prisma";

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordRessetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordRessetToken;
  } catch (error) {
    return null;
  }
};

export const getPassworResetTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};
