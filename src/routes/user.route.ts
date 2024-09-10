import { Router } from "express";
import {
  updateProfilePicture,
  updateUserPassword,
  updateUserProfile,
} from "../controllers/user.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { validateData } from "../middlewares/validateData";
import {
  updatePasswordSchema,
  updateProfilePictureSchema,
  updateUserProfileSchema,
} from "../schemas/user";

const userRouter = Router();

userRouter.patch(
  "/profile-picture",
  validateData(updateProfilePictureSchema),
  deserializeUser,
  updateProfilePicture,
);

userRouter.patch(
  "/",
  validateData(updateUserProfileSchema),
  deserializeUser,
  updateUserProfile,
);

userRouter.patch(
  "/update-password",
  validateData(updatePasswordSchema),
  deserializeUser,
  updateUserPassword,
);

export default userRouter;
