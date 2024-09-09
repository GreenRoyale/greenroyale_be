import config from "./default";

const APP_CONFIG = Object.freeze({
  QUEUE_RETRIES: 2,
  QUEUE_DELAY: 1000 * 30,
  REDIS_PORT: 6379,
  REDIS_HOST: config.NODE_ENV === "development" ? "localhost" : "",
  SMTP_FROM_ADDRESS: config.SMTP_FROM_ADDRESS || "<no-reply@greenroyale.com>",
  SMTP_HOST: config.SMTP_HOST || "smtp.example.com",
  SMTP_PORT: config.SMTP_PORT || 587,
  SMTP_SECURE: config.SMTP_SECURE === "true",
  SMTP_USER: config.SMTP_USER || "user@example.com",
  SMTP_PASSWORD: config.SMTP_PASSWORD || "password",
  BULL_BOARD_PASSWORD: "green-royale",
} as const);

export default APP_CONFIG;
