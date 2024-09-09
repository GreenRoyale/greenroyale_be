import { NextFunction, Request, Response } from "express";
import { ClientError } from "../exceptions/clientError";
import asyncHandler from "../middlewares/asyncHander";
import { UserService } from "../services/user.service";
import { BaseReponseHandler } from "./base-controllers/base-response-handler.controller";

const userService = new UserService();
const responseHandler = new BaseReponseHandler();

const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const payload = req.body;
    if (!userId || !payload) {
      return next(new ClientError("Missing required parameters"));
    }
    const response = await userService.updateUserProfilePicture({
      payload,
      userId,
    });

    return responseHandler.sendSuccessResponse(res, "Profile picture updated", {
      data: response,
    });
  },
);

const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const payload = req.body;

    const response = await userService.updateUserProfile({
      payload,
      userId,
    });

    return responseHandler.sendSuccessResponse(res, "Profile updated", {
      data: response,
    });
  },
);

export { updateProfilePicture, updateUserProfile };
