import { Router } from "express";
import { deleteUserController, getAllUserController } from "../controllers/user.controller";
import { createUserServices } from "../services/user.services";
import { getTeknisiController } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get("/", getAllUserController)
userRouter.get("/teknisi", getTeknisiController)
// userRouter.post("/create", createUserController)
userRouter.delete("/:id_user", deleteUserController)
// userRouter.put("/:id_user", updateUserController)

export default userRouter