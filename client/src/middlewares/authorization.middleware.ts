/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';

export const authorize = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    //@ts-ignore
  if (req.data.isAdmin) next();
  else {
    res.status(403).json({
      status: 'error',
      message: 'You do not have the required permission',
    });
  }
};
