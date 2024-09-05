import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHander";
import { AuthService } from "../services/auth.service";
import { createSendToken } from "../utils/createSendToken";

const authService = new AuthService();

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, message } = await authService.createUser(req.body);
    createSendToken(user, 201, message, req, res);
  },
);
