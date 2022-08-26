import { Router } from "express";
import {
  GetProductContoller,
  GetCategoriesContoller,
} from "../controllers/productController";
const route = Router();

route.get("/", GetProductContoller);
route.get("/categories", GetCategoriesContoller);

export default route;
