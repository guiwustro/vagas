import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken?.split(" ")[1];
  if (!token) throw new AppError("Invalid token", 401);

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {
      // if (err) throw new AppError("Invalid token", err);
      req.user = { isAdmin: decoded.isAdmin, id: decoded.sub };
      return next();
    }
  );
};
