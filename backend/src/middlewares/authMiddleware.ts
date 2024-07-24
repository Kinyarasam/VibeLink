import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../config/authConfig";
import { User } from "../models/userModel";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user: JwtPayload | string | undefined) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (typeof user === 'object' && 'userId' in user) {
        req.user = user as User;
      } else {
        req.user = undefined;
      }

      next();
    });
  } else {
    res.sendStatus(401);
  }
};
