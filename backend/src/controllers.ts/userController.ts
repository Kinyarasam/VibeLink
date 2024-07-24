import { Request, Response } from "express";
import { userService } from "../services/userService";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/authConfig";


export class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    console.log(userService.authenticate(username, password))
    if (userService.authenticate(username, password)) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2m' });
      res.json({ token })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  }
}
