import { Router } from "express";
import {
  GetProductContoller,
  GetCategoriesContoller,
  GetProductByIdController,
} from "../controllers/productController";
const route = Router();

route.get("/", GetProductContoller);
route.get("/categories", GetCategoriesContoller);
route.get("/:id", GetProductByIdController);

export default route;
