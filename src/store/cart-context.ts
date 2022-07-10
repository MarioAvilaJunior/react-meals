import React from "react";
import { ICartItem } from "../components/Cart/Cart";

export interface ICart {
  items: ICartItem[];
  totalAmount: number;
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext<ICart>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
