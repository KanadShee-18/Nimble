import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  password: z.string().min(6, {
    message: "Passwords must be at least 6 characters long.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Passwords must be at least 6 characters long.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a valid password.",
  }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export const ResetPasswordSchema = z.object({
  token: z.string({
    message: "Token is required!",
  }),
  password: z.string().min(6, {
    message: "Please enter a valid password.",
  }),
  confirmNewPassword: z.string().min(6, {
    message: "Please enter a valid password.",
  }),
});

export const SettingsSchema = z
  .object({
    // Name: Optional, but must not be an empty string
    name: z
      .string()
      .optional()
      .refine((val) => !val || val.trim().length > 0, {
        message: "Name can't be empty!",
      }),

    // Two-factor authentication: Optional boolean
    isTwoFactorEnabled: z.boolean().optional(),

    // Email: Optional, but must be valid if provided
    email: z
      .string()
      .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, {
        message: "Please enter a valid email address!",
      }),

    // Current password: Optional but must be at least 6 characters if provided
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 character(s)",
      }),

    // New password: Optional but must be at least 6 characters if provided
    newPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "New Password must be at least 6 character(s)",
      }),
  })
  .refine(
    (data) => {
      // If password is provided, newPassword must also be provided
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      // If newPassword is provided, password must also be provided
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Current Password is required!",
      path: ["password"],
    }
  );

export const ContactSchema = z.object({
  name: z.string({
    message: "Name is required!",
  }),
  email: z.string().email({
    message: "Email is required!",
  }),
  message: z.string().min(10, {
    message: "Message length should be minimum of 10  characters.",
  }),
});
