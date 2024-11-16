import { Router } from "express";
import { auhtController } from "../controllers/index.js";

export const userRouter = Router();

userRouter.post("/register", auhtController.register);
userRouter.post("/login", auhtController.login);
userRouter.put("/update/:id", auhtController.updateUser);
