import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT ?? 8000,
  NODE_ENV: process.env.NODE_ENV,
  prefix: process.env.API_PREFIX ?? "api/v1",

  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,

  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,

  cookieExpires: process.env.JWT_COOKIE_EXPIRES_IN,
  swaggerUrl: process.env.SWAGGER_JSON_URL,
};
