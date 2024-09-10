import { Router } from "express";
import {
  updateProfilePicture,
  updateUserProfile,
} from "../controllers/user.controller";
import { deserializeUser } from "../middlewares/deserializeUser";
import { validateData } from "../middlewares/validateData";
import {
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

export default userRouter;
