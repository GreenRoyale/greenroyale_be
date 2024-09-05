import config from "config";
import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { signToken } from "./jwt";

export const createSendToken = (
  user: Partial<User>,
  statusCode: number,
  message: string,
  req: Request,
  res: Response,
) => {
  const accessToken = signToken(user.id, "accessTokenPrivateKey", {
    expiresIn: config.get<string>("accessTokenTtl"),
  });

  const refreshToken = signToken(user.id, "refreshTokenPrivateKey", {
    expiresIn: config.get<string>("refreshTokenTtl"),
  });

  const expiresInDays = Number(config.get<string>("cookieExpires"));

  const expires = expiresInDays * 24 * 60 * 60 * 1000;

  const cookieOptions = {
    expires: new Date(Date.now() + expires),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("refresh-token", refreshToken, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    message,
    data: { user },
    tokens: { accessToken, refreshToken },
  });
};
