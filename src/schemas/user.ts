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

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address");

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password can't exceed 100 characters");

export const userSignUpSchema = z.object({
  first_name: firstNameSchema,
  last_name: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const updateProfilePictureSchema = z.object({
  photo: z.string().min(1, "Please provide a valid link to profile avatar"),
});

export const updateUserProfileSchema = z.object({
  first_name: firstNameSchema,
  last_name: lastNameSchema,
});

export const updatePasswordSchema = z.object({
  current_password: passwordSchema,
  new_password: passwordSchema,
});

export type IUserSignUpSchema = z.infer<typeof userSignUpSchema>;
export type ILoginSchema = z.infer<typeof loginSchema>;
export type IUpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
export type IUpdateProfilePictureSchema = z.infer<
  typeof updateProfilePictureSchema
>;
export type IUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
