import config from "config";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { CustomJwtPayload } from "../interfaces";
import log from "./logger";

export const signToken = (
  id: string,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: SignOptions | undefined,
) => {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64",
  ).toString("ascii");

  return sign({ id }, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyToken = (
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey",
): CustomJwtPayload | null => {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii",
  );

  try {
    const decoded = verify(token, publicKey) as CustomJwtPayload;

    return decoded;
  } catch (error: any) {
    log.error("Token verification failed");
    return null;
  }
};
