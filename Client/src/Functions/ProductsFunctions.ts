import axios from "axios";

export const GetProducts = async (id?:number,search?:string) => {  
  const products = await (
    await axios.get(`http://localhost:3000/product/?category=${id}&search=${search}`)
  ).data 
  return products;
};
export const GetCategories = async () => {
  const products = await (
    await axios.get("http://localhost:3000/product/categories")
  ).data;
  return products;
};
export const GetProductById = async (id:number) => {
  const products = await (
    await axios.get(`http://localhost:3000/product/${id}`)
  ).data;
  return products;
};
