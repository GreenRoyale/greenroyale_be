import { z } from "zod";

export const userSignUpSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name can't exceed 100 characters"),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name can't exceed 100 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password can't exceed 100 characters"),
});

export type IUserSignUpSchema = z.infer<typeof userSignUpSchema>;
