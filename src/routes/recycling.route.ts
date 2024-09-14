import { Router } from "express";
import {
  createRecyclingLog,
  getAllRecyclingLog,
  getRecyclingLogById,
} from "../controllers/recycling.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { validateData } from "../middlewares/validateData";
import { recyclingSchema } from "../schemas/recycling";

const recyclingRouter = Router();

recyclingRouter.post(
  "/",
  validateData(recyclingSchema),
  deserializeUser,
  createRecyclingLog,
);

recyclingRouter.get("/", getAllRecyclingLog);

recyclingRouter.get("/:recycle_id", getRecyclingLogById);

export default recyclingRouter;
