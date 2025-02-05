"use server";

import * as z from "zod";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mailsender";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        error: "Invalid input data.",
      };
    }
    const { email, name, password, confirmPassword } = validatedData.data;

    if (password !== confirmPassword) {
      return {
        error: "Both of the passwords have to be matched.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExistance = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExistance) {
      return {
        error: "User already exists or user email is currently in use!",
      };
    }

    const lowercaseEmail = email.toLowerCase();

    const createdUser = await prisma.user.create({
      data: {
        email: lowercaseEmail,
        name,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(
      email,
      createdUser.id
    );

    // Send the verification email:
    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
      title: "Email Confirmation - NIMBLE",
      body: "Confirm your email by clicking this button below!",
      type: "VERIFY",
    });

    return {
      success: "Confirmation email has been sent to your email.",
    };
  } catch (error) {
    return {
      error: "Some error occurred while registering!",
    };
  }
};
