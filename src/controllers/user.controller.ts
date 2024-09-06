import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHander";
import { UserService } from "../services/user.service";
import { BaseReponseHandler } from "./base-controllers/base-response-handler.controller";

const userService = new UserService();
const responseHandler = new BaseReponseHandler();

const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // TODO: REPLACE USER_ID WITH DATA COMING FROM AUTH_MIDDLEWARE
    const userId = "";
    const payload = req.body;
    const response = await userService.updateUserProfilePicture({
      payload,
      userId,
    });

    return responseHandler.sendSuccessResponse(res, "Profile pictue updated", {
      data: response,
    });
  },
);

const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = "";
    const payload = req.body;

    const response = await userService;
  },
);

export { updateProfilePicture, updateUserProfile };
