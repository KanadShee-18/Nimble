"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function GoogleAuthentication() {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      return "Google Login Failed!";
    }
    throw error;
  }
}
