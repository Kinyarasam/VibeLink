import { Router } from "express";
import { HelloController } from "../controllers.ts/helloController";
import { UserController } from "../controllers.ts/userController";

const router = Router();

router.get('/helloworld', HelloController.sayHello);
router.post('/login', UserController.login);

export default router;
