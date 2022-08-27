import { Controller } from "../models/interfaces";
import Product, { ProductSchema } from "../models/product";

export const GetProductContoller: Controller = async (req, res, next) => {
  // Get Query
  let { category, search } = req.query;

  // Get All Categories
  let categories: any = await Product.getAllCategories();
  categories = categories.map((i: { id: number }) => {
    return i.id;
  });
  try {
    if (category && categories.includes(Number(category))) {
      const products: any = await Product.getProductsByCategories(
        Number(category)
      );

      res.send(
        products.filter((i: ProductSchema) => {
          return new RegExp(String(search).trimEnd(), "gi").test(i.name);
        })
      );
    } else {
      const products: any = await Product.getProducts();
      search
        ? res.send(
            products.filter((i: ProductSchema) => {
              return new RegExp(String(search).trimEnd(), "gi").test(i.name);
            })
          )
        : res.send(products);
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

export const GetProductByIdController: Controller = async (req, res, next) => {
  const { id } = req.params;
  try {
    let categories: any = await Product.GetProductById(Number(id));
    res.send(categories);
  } catch (error) {
    res.send({ error });
    next();
  }
};
