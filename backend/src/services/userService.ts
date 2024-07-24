import { UserModel } from "../models/userModel";

export class userService {
  static authenticate(username: string, password: string): boolean {
    const user = UserModel.findUser(username);
    return user ? user.password === password : false;
  }
}