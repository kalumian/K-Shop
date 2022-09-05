import { Router } from "express";
import { loginController, registerController } from "../controllers/usersController";
const route = Router();

route.post("/register", registerController);
route.post("/login", loginController);

export default route;
