import { db } from "../db";
import { Categories } from "./interfaces";
interface ProductSchema {
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}
export default class Product implements ProductSchema {
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  constructor(
    name: string,
    image: string,
    price: number,
    description: string,
    category: string
  ) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.category = category;
  }

  // Methods
  static async getProducts() {
    const order =
      "SELECT `products`.`id`,`products`.`name`,`products`.`description`,`products`.`price`,`products`.`category`,`products`.`image` FROM `k-shop`.`products`;";
    const [result] = await db.execute(order);
    return result;
  }
  static async getProductsByCategories(id: number) {
    const order = `SELECT * FROM \`k-shop\`.products where category = ${id}`;
    const [result] = await db.execute(order);
    return result;
  }
  static async getAllCategories() {
    const order:string = `SELECT * FROM \`k-shop\`.categories;`;
    const [result] = await db.execute(order);
    return result;
  }
}

console.log(Product.getProducts());
