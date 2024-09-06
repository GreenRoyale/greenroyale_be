import { NextFunction, Router } from "express";
import {
  updateProfilePicture,
  updateUserProfile,
} from "../controllers/user.controller";
import { validateData } from "../middlewares/validateData";
import {
  updateProfilePictureSchema,
  updateUserProfileSchema,
} from "../schemas/user";
import log from "../utils/logger";

const userRouter = Router();

userRouter.patch(
  "/profile-picture",
  validateData(updateProfilePictureSchema),
  (_, res, next: NextFunction) => {
    log.info("AUTH MIDDLEWARE SHOULD BE HERE!");
    next();
  },
  updateProfilePicture,
);

userRouter.patch(
  "/",
  validateData(updateUserProfileSchema),
  (_, res, next: NextFunction) => {
    log.info("AUTH MIDDLEWARE SHOULD BE HERE!");
    next();
  },
  updateUserProfile,
);

export default userRouter;
