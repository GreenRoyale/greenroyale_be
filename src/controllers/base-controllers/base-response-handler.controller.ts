import { Response } from "express";
import HTTP_STATUS_CODE from "../../../config/http-status-code";
import { IResponseMessage } from "../../interfaces";

export class BaseReponseHandler {
  async sendErrorResponse(
    res: Response,
    err: Error,
    responseMessage: IResponseMessage,
    statusCode: number,
    data?: Record<string, any>,
  ) {
    const response = {
      status: HTTP_STATUS_CODE[statusCode as keyof typeof HTTP_STATUS_CODE],
      message: responseMessage.message,
      statusCode,
      data,
    };

    res.status(statusCode).json(response);
  }

  async sendSuccessResponse(
    res: Response,
    message: string,
    data: any = null,
    statusCode: number = 200,
  ) {
    const response = {
      status: HTTP_STATUS_CODE[statusCode as keyof typeof HTTP_STATUS_CODE],
      message: message,
      data,
    };
    res.status(statusCode).json(response);
  }
}
