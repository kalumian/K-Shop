import { db } from "../db";

export interface CartInterface {
  cartId?: number;
  productId: number;
  userId: number;
  timesStamp: string;
  name: string;
  price: number;
  type: boolean;
  amount: number;
  image: string;
}

export default class Cart implements CartInterface {
  cartId?: number;
  productId: number;
  userId: number;
  timesStamp: string;
  name: string;
  price: number;
  type: boolean;
  amount: number;
  image: string;
  constructor({
    type,
    cartId,
    price,
    productId,
    timesStamp,
    name,
    userId,
    amount,
    image,
  }: CartInterface) {
    this.type = type;
    this.cartId = cartId;
    this.timesStamp = timesStamp;
    this.price = price;
    this.productId = productId;
    this.name = name;
    this.userId = userId;
    this.amount = amount;
    this.image = image;
  }

  //    GetCartByUserID
  static getCartByUserId = async (id: number) => {
    const order: string = `SELECT * FROM \`k-shop\`.carts where userId = ${id};`;
    const [response, _] = await db.execute(order);
    return response;
  };
  //    Add new Cart
  static addCart = async ({
    name,
    price,
    timesStamp,
    type,
    userId,
    amount,
    productId,
    image,
  }: CartInterface) => {
    const order = `INSERT INTO \`k-shop\`.\`carts\`
    (
    name,
    price,
    type,
    timesStamp,
    userId,
    productId,
    amount,
    image
    )
    VALUES
    (
    '${name}',
    ${price},
    ${type},
    '${timesStamp}',
    ${userId},
    ${productId},
    ${amount},
    '${image}'
    );
    `;
    const [result, _] = await db.execute(order);
    return result;
  };

  //    Delete Cart
  static deleteCart = async (id: number) => {
    const order = `DELETE FROM \`k-shop\`.\`carts\` WHERE cartId = ${id};`;
    const [result, _] = await db.execute(order);
    return result;
  };
  //
  
  //    Delete Cart
  static clearCarts = async (id: number) => {
    const order = `DELETE FROM \`k-shop\`.\`carts\` WHERE userId = ${id};`;
    const [result, _] = await db.execute(order);
    return result;
  };
  //
  
}
