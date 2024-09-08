import config from "config";
import { NextFunction, Request, Response } from "express";
import { ClientError } from "../exceptions/clientError";
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
  const { message } = await authService.verifyEmail(token);

  res.status(200).json({
    status: "success",
    message,
  });
});

export const resendVerificationEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return next(new ClientError("Email required"));
    }

    const { message } = await authService.resendVerificationEmail(email);

    res.status(200).json({
      status: "success",
      message,
    });
  },
);

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const resetURL = `${req.protocol}://${req.get("host")}/${config.get<string>("prefix")}/auth/reset-password/`;
    const { message } = await authService.forgotPassword(email, resetURL);

    res.status(200).json({
      status: "sucess",
      message,
    });
  },
);
