import { Controller } from "../models/interfaces";
import Product, { ProductSchema } from "../models/product";
import { tokenDecode } from "../models/token";
import User from "../models/user";
const jtw = require("jsonwebtoken");
export const GetProductContoller: Controller = async (req, res, next) => {
  // Get Query
  let { category, search } = req.query;

  search = String(search).replace(/\*/gi, "");

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
  const token = tokenDecode(String(req.headers.authorization));

  try {
    const user = await User.IsThereMail(token?.email);

    if (user) {
      jtw.verify(req.headers.authorization, user.salt);
      let product: any = await Product.GetProductById(Number(id));
      res.send(product);
    } else {
      res.status(404).send("Token is Wrong");
    }
  } catch (error: any) {
    res.status(400).send({
      name: error.name,
      message: error.message,
      expiredAt: error.expiredAt,
    });
    next();
  }
};
