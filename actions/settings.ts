"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mailsender";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        error: "Unauthorized!",
      };
    }
    if (user && user.id) {
      const dbUser = await getUserById(user?.id);

      if (!dbUser) {
        return {
          error: "Unauthorized!",
        };
      }

      const filteredValues: Partial<z.infer<typeof SettingsSchema>> = {};

      if (user.isOauth) {
        filteredValues.email = undefined;
        filteredValues.password = undefined;
        filteredValues.newPassword = undefined;
        filteredValues.isTwoFactorEnabled = undefined;
      } else {
        if (values.name !== undefined && values.name !== "") {
          filteredValues.name = values.name;
        }

        if (
          values.email !== undefined &&
          values.email !== "" &&
          values.email !== user.email
        ) {
          const existingUser = await getUserByEmail(values.email);
          // if (existingUser?.email === values.email) {
          //   return {
          //     error: "You're already using this email.",
          //   };
          // }
          if (existingUser && existingUser.id !== user.id) {
            return {
              error: "Email is already in use!",
            };
          }
          const verificationEmailToken = await generateVerificationToken(
            values.email,
            dbUser.id
          );
          await sendVerificationEmail({
            email: verificationEmailToken.email,
            token: verificationEmailToken.token,
            title: "Email Confirmation - NextAuth",
            body: "Confirm your email by clicking this button below!",
            type: "VERIFY",
          });

          return {
            success: "Verification email sent!",
          };
        }

        if (
          values.password !== undefined &&
          values.newPassword !== undefined &&
          values.password !== "" &&
          values.newPassword !== "" &&
          dbUser.password
        ) {
          const passwordMatch = await bcrypt.compare(
            values.password,
            dbUser.password
          );
          if (!passwordMatch) {
            return {
              error: "Please enter correct password to update with new!",
            };
          }
          const hashedPassword = await bcrypt.hash(values.newPassword, 10);
          filteredValues.password = hashedPassword;
          values.newPassword = undefined;
        }

        if (values.isTwoFactorEnabled !== undefined) {
          filteredValues.isTwoFactorEnabled = values.isTwoFactorEnabled;
        }
      }

      await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: filteredValues,
      });
    }
    return {
      success: "Settings updated!",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
