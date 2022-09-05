export interface setCart {
  name: string;
  price: number;
  amount: number;
  userId: number;
  productId: number;
  image: string;
}

export interface getCart {
  name: string;
  productId: number;
  userId: number;
  cartId: number;
  price: number;
  amount: number;
  image: string;
  timesStamp: string;
  type: boolean;
}
