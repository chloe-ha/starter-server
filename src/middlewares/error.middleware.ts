import { NextFunction, Request, Response } from 'express';
import { HttpException } from '/exceptions/HttpException';
import { ResBody } from '/interfaces/http.interface';
import logger from '/utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response<ResBody>, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
