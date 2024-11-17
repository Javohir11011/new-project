import { Router } from "express";
import { profileController } from "../controllers/index.js";

export const profileRouter = Router();

profileRouter.get("/all", profileController.getAllScProfiles);
profileRouter.get("/all/:id", profileController.getByIdScProfiles);
profileRouter.post("/create", profileController.createScProfiles);
profileRouter.put("/update/:id", profileController.updateScProfiles);
profileRouter.delete("/delete/:id", profileController.deleteScProfiles);
