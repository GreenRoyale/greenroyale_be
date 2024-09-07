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

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { user, message } = await authService.loginUser(req.body);
  createSendToken(user, 200, message, req, res);
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const token = req.query.token as string;
  const message = await authService.verifyEmail(token);

  res.status(200).json({
    status: "success",
    message,
  });
});
