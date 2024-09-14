import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHander";
import { RecyclingService } from "../services/recycling.service";
import { BaseReponseHandler } from "./base-controllers/base-response-handler.controller";

const recyclingService = new RecyclingService();
const responseHandler = new BaseReponseHandler();
export const createRecyclingLog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const materials = req.body;

    const response = await recyclingService.createRecyclingLog(
      materials,
      req.user.id,
    );

    responseHandler.sendSuccessResponse(
      res,
      "Recycling log created successfully",
      response.record,
      201,
    );
  },
);

export const getAllRecyclingLog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await recyclingService.fetchAllRecyclingLog();

    responseHandler.sendSuccessResponse(
      res,
      "Retrieved successfully",
      response,
    );
  },
);

export const getRecyclingLogById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await recyclingService.fetchRecyclingLogById(
      req.params.recycle_id,
    );

    responseHandler.sendSuccessResponse(
      res,
      "Retrieved successfully",
      response,
    );
  },
);
