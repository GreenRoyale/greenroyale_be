import { RECYCLINGMATERIALENUM } from "../entities/recycling-material.entity";
import { IUpdateUserProfileSchema } from "../schemas/user";

import { JwtPayload } from "jsonwebtoken";

export interface IUserSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IResponseError {
  status: string;
  message: string;
}

export interface IEmailData {
  to: string;
  subject: string;
  template: string;
  variables: Record<string, any>;
}

export interface IResponseMessage {
  response_code: number;
  message: string;
}

export interface IUserProfilePicturePayload {
  photo: string;
}

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  password_version: number;
}

export type UserUpdatePayload = IUpdateUserProfileSchema & {
  photo?: string;
};

export interface IUserProfilePicturePayload {
  photo: string;
}

export interface IRecyclingDTO {
  user: string;
  material: RECYCLINGMATERIALENUM;
  quantity: number;
  point: number;
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
