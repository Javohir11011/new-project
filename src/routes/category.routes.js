import { Router } from "express";
import { categoryController } from "../controllers/index.js";

export const categoryRouter = Router();

categoryRouter.get("/all", categoryController.getAllCategory);
categoryRouter.get("/all/:id", categoryController.getByIdCategory);
categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.put("/update/:id", categoryController.updateCategory);
categoryRouter.delete("/delete/:id", categoryController.deleteCategory);
