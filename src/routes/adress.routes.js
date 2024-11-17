import { Router } from "express";
import { adressesController } from "../controllers/index.js";

export const adressRouter = Router();

adressRouter.get("/all", adressesController.getAllAdress);
adressRouter.get("/all/:id", adressesController.getByIdAdress);
adressRouter.post("/create", adressesController.createAdress);
adressRouter.put("/update/:id", adressesController.updateAdress);
adressRouter.delete("/delete/:id", adressesController.deleteAdress);
