import { HelloModel } from "../models/helloModel";

export default class HelloService {
  static sayHello(name: String) {
    return HelloModel.getGreeting(name);
  }
}
