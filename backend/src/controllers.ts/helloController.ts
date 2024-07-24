import { Request, Response } from "express";
import { getGrpcClient } from "../config/grpcClient";
import * as grpc from '@grpc/grpc-js';

export class HelloController {
  static async sayHello(req: Request, res: Response) {
    const request = { name: req.query.name || 'World' };
    const client = getGrpcClient();

    client.sayHello(request, (error: grpc.ServiceError | null, response: any) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(response);
      }
    });
  }
}
