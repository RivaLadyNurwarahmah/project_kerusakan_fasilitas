import { Router } from "express";
import { deleteUserController, getAllUserController } from "../controllers/user.controller";
import { createUserServices } from "../services/user.services";

const userRouter = Router()

userRouter.get("/", getAllUserController)
// userRouter.post("/create", createUserController)
userRouter.delete("/:id_user", deleteUserController)
// userRouter.put("/:id_user", updateUserController)

export default userRouter