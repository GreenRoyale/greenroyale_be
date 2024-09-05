import config from "config";
import { sign, SignOptions } from "jsonwebtoken";

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
