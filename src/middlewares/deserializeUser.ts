import config from "config";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { UnauthorizedError } from "../exceptions/unauthorizedError";
import { signToken, verifyToken } from "../utils/jwt";
import asyncHandler from "./asyncHander";

const extractTokens = (req: Request) => {
  let accessToken =
    req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;
  const refreshToken =
    req.cookies.refreshToken || req.headers["x-refresh-token"];

  if (!accessToken && !refreshToken) {
    throw new UnauthorizedError("Missing tokens. Please log in.");
  }

  return { accessToken, refreshToken };
};

const checkUserExists = async (userId: string) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
};

const refreshAccessToken = async (
  refreshToken: string,
): Promise<string | false> => {
  const decoded = verifyToken(refreshToken, "refreshTokenPublicKey");

  if (!decoded) return false;

  const user = await checkUserExists(decoded.id);

  if (!user) return false;

  const accessToken = signToken(
    user.id,
    user.password_version,
    "accessTokenPrivateKey",
    { expiresIn: config.get<string>("accessTokenTtl") },
  );

  return accessToken;
};

export const deserializeUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = extractTokens(req);

    const decoded = accessToken
      ? verifyToken(accessToken, "accessTokenPublicKey")
      : null;

    if (decoded) {
      const currentUser = await checkUserExists(decoded.id);

      if (
        currentUser.changedPasswordAfterTokenIssued(decoded.password_version)
      ) {
        return next(
          new UnauthorizedError(
            "User recently changed password!. Please log in again.",
          ),
        );
      }

      req.user = currentUser;
      return next();
    }

    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (!newAccessToken) {
        return next(
          new UnauthorizedError("Invalid refresh token! Please log in again."),
        );
      }

      res.setHeader("x-access-token", newAccessToken);
      const newDecoded = verifyToken(newAccessToken, "accessTokenPublicKey");
      req.user = await checkUserExists(newDecoded!.id);

      return next();
    }
    return next();
  },
);
