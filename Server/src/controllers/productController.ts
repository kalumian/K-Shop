import { Controller } from "../models/interfaces";
import Product from "../models/product";

export const GetProductContoller: Controller = async (req, res, next) => {
  // Get Query
  let query = req.query.category;

  // Get All Categories
  let categories: any = await Product.getAllCategories();
  categories = categories.map((i: { id: number }) => {
    return i.id;
  });
  try {
    if (query && categories.includes(Number(query))) {
      const products = await Product.getProductsByCategories(Number(query));
      res.send(products);
    } else {
      const products = await Product.getProducts();
      res.send(products);
    }
  } catch (error) {
    res.send({ error });
    next();
  }
};
export const GetCategoriesContoller: Controller = async (req, res, next) => {
  try {
    let categories: any = await Product.getAllCategories();
    res.send(categories);
  } catch (error) {
    res.send({ error });
    next();
  }
};
