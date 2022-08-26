import axios from "axios";

export const GetProducts = async (id?:number) => {  
  const products = id ? await (
    await axios.get(`http://localhost:3000/product/?category=${id}`)
  ).data : await (
    await axios.get(`http://localhost:3000/product`)
  ).data 
  return products;
};
export const GetCategories = async () => {
  const products = await (
    await axios.get("http://localhost:3000/product/categories")
  ).data;
  return products;
};
