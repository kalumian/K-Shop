import axios, { AxiosResponse } from "axios";
import { User } from "../interfaces/userInterface";
export const Register = async ({
  username,
  adress,
  email,
  password,
  rePassword,
}: User) => {
  // console.log(username, adress, email, password, rePassword);
  const products = axios.post("http://localhost:3000/user/register", {
    username,
    adress,
    email,
    password,
    rePassword,
  });

  return products;
};
