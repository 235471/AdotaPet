import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CustomError } from "../error/customError";

// Error handling middleware
export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res.status(err.code || 500).json({
      message: err.message,
      code: err.code,
      details: err.details,
    });
    return;
  }

  // For other types of errors (fallback)
  res.status(500).json({ message: "Internal Server Error" });
};
