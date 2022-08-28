import { Router } from "express";
import { registerController } from "../controllers/usersController";
const route = Router();

route.post("/register", registerController);

export default route;
