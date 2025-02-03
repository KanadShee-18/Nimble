"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function GithubAuthentication() {
  try {
    await signIn("github");
  } catch (error) {
    if (error instanceof AuthError) {
      return "Github Authentication failed!";
    }
    throw error;
  }
}
