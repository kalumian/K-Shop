import React from "react";
import { useState } from "react";
import { GetCarts } from "../Functions/CartFunctions";
import AuthService from "../Functions/services/auth.service";
import { getCart } from "../interfaces/cartInterfaces";

interface Init {
  setCarts?: React.Dispatch<React.SetStateAction<getCart[]>>;
  // carts: getCart[];
  getCarts: any;
  carts: any;
}
export const CartContext = React.createContext<Init | null>(null);

type Props = {
  children: React.ReactNode;
};

function CartContextProvider({ children }: Props): JSX.Element {
  const [carts, setCarts] = useState<getCart[]>([]);
  const getCarts = async () => {
    if (AuthService.isUser()) {
      const { sub } = AuthService.getUserAsObject();
      try {
        const Carts = await GetCarts(sub);
        setCarts(Carts);
        return Carts;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ getCarts, carts }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
