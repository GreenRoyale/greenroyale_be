import { NextFunction, Request, Response } from "express";
import { ClientError } from "../exceptions/clientError";
import { UnauthorizedError } from "../exceptions/unauthorizedError";
import asyncHandler from "../middlewares/asyncHander";
import { UserService } from "../services/user.service";
import { createSendToken } from "../utils/createSendToken";
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
    if (!req.user || !req.user.id) {
      return next(
        new UnauthorizedError(
          "You are not logged in. Please log in to access this route.",
        ),
      );
    }

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

const updateUserPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(
        new UnauthorizedError(
          "You are not logged in. Please log in to access this route.",
        ),
      );
    }

    const userId = req.user.id;
    const payload = req.body;

    const { user, message } = await userService.updateUserPassword(
      userId,
      payload,
    );

    createSendToken(user, 200, message, req, res);
  },
);

export { updateProfilePicture, updateUserPassword, updateUserProfile };
