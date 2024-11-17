import { Router } from "express";
import { auhtController } from "../controllers/index.js";

export const userRouter = Router();

userRouter.get("/all", auhtController.getAllUsers);
userRouter.get("/all/:id", auhtController.getByIdUsers);
userRouter.post("/register", auhtController.register);
userRouter.post("/login", auhtController.login);
userRouter.put("/update/:id", auhtController.updateUser);
userRouter.delete("/delete/:id", auhtController.deleteUser);
