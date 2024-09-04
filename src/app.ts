import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import config from "./config/index";
import swaggerSpec from "./config/swaggerConfig";
import { MethodNotAllowedError } from "./exceptions/methodNotAllowedError";
import { NotFoundError } from "./exceptions/notFoundError";
import globalErrorHandler from "./middlewares/errorHandler";
import router from "./routes/index.route";

const app: Express = express();
app.disable("x-powered-by");
app.use(helmet());
app.options("*", cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);

app.use(
  hpp({
    whitelist: ["recycle", "reward", "ai"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(compression());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/" + config.API_PREFIX, router);
app.use("/openapi.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next();
  }
  next(
    new MethodNotAllowedError(
      `Method ${req.method} not allowed on ${req.originalUrl}`,
    ),
  );
});

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

export default app;
