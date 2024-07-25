import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/authConfig";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const userRepository = getRepository(User);

    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    await userRepository.save(user);

    res.send("User registered");
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, username: username },
      JWT_SECRET, { expiresIn: "1h" }
    );
    return res.send({ token });
  }
}