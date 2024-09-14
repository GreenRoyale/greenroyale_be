import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHander";
import { RecyclingService } from "../services/recycling.service";
import { BaseReponseHandler } from "./base-controllers/base-response-handler.controller";

const recyclingService = new RecyclingService();
const responseHandler = new BaseReponseHandler();
export const createRecyclingLog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const materials = req.body;

    console.log(materials);
    const response = await recyclingService.createRecyclingLog(
      materials,
      "req.user.id",
    );

    console.log({ response });

    responseHandler.sendSuccessResponse(
      res,
      "Recycling log created successfully",
      response.record,
      201,
    );
  },
);
