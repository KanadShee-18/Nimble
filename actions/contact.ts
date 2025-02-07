"use server";

import * as z from "zod";
import { ContactSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/prisma/prisma";

export const ContactUs = async (values: z.infer<typeof ContactSchema>) => {
  try {
    const validatedFields = ContactSchema.parse(values);
    const { name, email, message } = validatedFields;
    if (!name || !email || !message) {
      return {
        error: "All field are required!",
      };
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return {
        error: "No user is registered with this email!",
      };
    }
    await prisma.userMessage.create({
      data: {
        userName: name,
        userEmail: email,
        userMsg: message,
      },
    });
    return {
      success: "We have received your message!",
    };
  } catch (error) {
    return {
      error: "Some error from our side. Try again!",
    };
  }
};
