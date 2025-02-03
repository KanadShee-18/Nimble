import { prisma } from "@/prisma/prisma";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      }
    );
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
