import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import compression from "compression";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import APP_CONFIG from "../config/app.config";
import swaggerSpec from "../config/swaggerConfig";
import { MethodNotAllowedError } from "./exceptions/methodNotAllowedError";
import { NotFoundError } from "./exceptions/notFoundError";
import globalErrorHandler from "./middlewares/errorHandler";
import router from "./routes/index.route";
import { emailQueue } from "./utils/queue.utils";

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
    credentials: true,
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
// bull-board
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter,
});

if (config.get<string>("NODE_ENV") === "development") {
  app.use(morgan("dev"));
}

app.use(compression());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/" + config.get<string>("prefix"), router);
app.use(
  "/admin/queues",
  (req: Request, res: Response, next: NextFunction) => {
    const password = req.query.password;
    if (password === APP_CONFIG.BULL_BOARD_PASSWORD) {
      return next();
    }

    return res.status(401).send("<h1> Wrong Password: ❌❌❌ </h1>");
  },
  serverAdapter.getRouter(),
);
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
