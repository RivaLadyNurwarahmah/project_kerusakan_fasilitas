import { Router } from "express";
import { LoginController, RegisterController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/login', LoginController)
authRouter.post('/register', RegisterController)

export default authRouter