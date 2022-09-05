import axios from "axios";
import { setCart } from "../interfaces/cartInterfaces";
import authHeader from "./services/auth-header";

export const DeleteCart = async (cartId: number) => {
  const response = await (
    await axios({
      method: "POST",
      url: `http://localhost:3000/cart/delete`,
      headers: authHeader(),
      data: {
        cartId,
      },
    })
  ).data;
  console.log(response);
  return response;
};

export const AddCart = async ({
  name,
  price,
  productId,
  userId,
  amount,
  image,
}: setCart) => {
  const response = await (
    await axios({
      method: "POST",
      url: `http://localhost:3000/cart/add`,
      headers: authHeader(),
      data: {
        name,
        price,
        productId,
        userId,
        amount,
        image,
      },
    })
  ).data;
  console.log(response);
  return response;
};

export const GetCarts = async (userId: number) => {
  const response = await (
    await axios({
      method: "POST",
      url: `http://localhost:3000/cart`,
      headers: authHeader(),
      data: {
        userId,
      },
    })
  ).data;
  return response;
};
export const ClearCarts = async (userId: number) => {
  const response = await (
    await axios({
      method: "POST",
      url: `http://localhost:3000/cart/clear`,
      headers: authHeader(),
      data: {
        userId,
      },
    })
  ).data;
  return response;
};
