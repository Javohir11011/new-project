import { Router } from "express";
import { productController } from "../controllers/index.js";

export const productRouter = Router();

productRouter.get("/all", productController.getAllProduct);
productRouter.get("/all/:id", productController.getByIdProduct);
productRouter.post("/create", productController.createProduct);
productRouter.put("/update/:id", productController.updateProduct);
productRouter.delete("/delete/:id", productController.deleteProduct);
