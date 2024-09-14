import { Router } from "express";
import authRouter from "./auth.route";
import recyclingRoute from "./recycling.route";
import userRouter from "./user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/recycling", recyclingRoute);

export default router;
