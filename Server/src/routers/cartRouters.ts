import { Router } from "express";
import {
  addCartController,
  delteCartController,
  getCartByUserIdController,
  clearCartsController,
} from "../controllers/cartController";
const route = Router();

// Get By userID

// Add
route.post("/add", addCartController);
route.post("/delete", delteCartController);
route.post("/", getCartByUserIdController);
route.post("/clear", clearCartsController);

// Delete By Id

export default route;
