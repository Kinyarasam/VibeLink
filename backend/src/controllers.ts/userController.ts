import { Request, Response } from "express";
import { authGrpcClient } from "../config/grpcClient";
import { userService } from "../services/userService";
import jwt from 'jsonwebtoken';
import * as grpc from '@grpc/grpc-js';
import { JWT_SECRET } from "../config/authConfig";


export class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const request = req.body;
    const client = authGrpcClient();

    client.authenticateUser(request, (error: grpc.ServiceError | null, response: any) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        const token = jwt.sign({ username: request.username }, JWT_SECRET, { expiresIn: '2m' });
        res.json({ token });
      }
    });
  }
}
