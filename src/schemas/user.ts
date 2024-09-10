import { z } from "zod";

const firstNameSchema = z
  .string()
  .trim()
  .min(1, "First name is required")
  .max(100, "First name can't exceed 100 characters");

const lastNameSchema = z
  .string()
  .trim()
  .min(1, "Last name is required")
  .max(100, "Last name can't exceed 100 characters");

export const userSignUpSchema = z.object({
  first_name: firstNameSchema,
  last_name: lastNameSchema,
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password can't exceed 100 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const updateProfilePictureSchema = z.object({
  photo: z.string().min(1, "Please provide a valid link to profile avatar"),
});

export const updateUserProfileSchema = z.object({
  first_name: firstNameSchema,
  last_name: lastNameSchema,
});

export type IUserSignUpSchema = z.infer<typeof userSignUpSchema>;
export type ILoginSchema = z.infer<typeof loginSchema>;
export type IUpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
export type IUpdateProfilePictureSchema = z.infer<
  typeof updateProfilePictureSchema
>;
