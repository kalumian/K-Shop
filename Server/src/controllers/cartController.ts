import User from "../models/user";
const jtw = require("jsonwebtoken");
import Cart, { CartInterface } from "../models/cart";
import { Controller } from "../models/interfaces";
import { tokenDecode } from "../models/token";

// Add
export const addCartController: Controller = async (req, res, next) => {
  try {
    const token = tokenDecode(String(req.headers.authorization));
    const user = await User.IsThereMail(token?.email);
    if (user) {
      jtw.verify(req.headers.authorization, user.salt);
      const {
        name,
        price,
        userId,
        productId,
        amount = 1,
        image,
      }: CartInterface = req.body;
      const date: Date = new Date();
      if (amount < 1) {
        res.status(404).send({ error: "ammount < 1" });
      }
      const cart = new Cart({
        type: true,
        userId: userId,
        productId,
        timesStamp: `${date.getDay() + 1}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`,
        name,
        price: price * amount,
        amount,
        image,
      });
      const response = await Cart.addCart(cart);
      res.status(201).send({ message: "is Created" });
    } else {
      res.status(404).send("Token is Wrong");
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};
// Delete By Id
export const delteCartController: Controller = async (req, res, next) => {
  try {
    const token = tokenDecode(String(req.headers.authorization));
    const user = await User.IsThereMail(token?.email);
    if (user) {
      jtw.verify(req.headers.authorization, user.salt);
      const { cartId }: { cartId: number } = req.body;
      const response = await Cart.deleteCart(cartId);
      res
        .status(202)
        .send({ message: "Cart id number " + cartId + " has been deleted" });
    } else {
      res.status(404).send("Token is Wrong");
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};
// Get Cart By User Id
export const getCartByUserIdController: Controller = async (req, res, next) => {
  try {
    const token = tokenDecode(String(req.headers.authorization));
    const user = await User.IsThereMail(token?.email);
    if (user) {
      const { userId }: { userId: number } = req.body;
      const response = await Cart.getCartByUserId(userId);
      res.status(200).send(response);
    } else {
      res.status(404).send("Token is Wrong");
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};
// Delete all By Id
export const clearCartsController: Controller = async (req, res, next) => {
  try {
    const token = tokenDecode(String(req.headers.authorization));
    const user = await User.IsThereMail(token?.email);
    if (user) {
      jtw.verify(req.headers.authorization, user.salt);
      const { userId }: { userId: number } = req.body;
      const response = await Cart.clearCarts(userId);
      res
        .status(202)
        .send({ message: "userId's Cart " + userId + " has been deleted" });
    } else {
      res.status(404).send("Token is Wrong");
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};
