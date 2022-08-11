import React from "react";
import { ICartItem } from "../components/Cart/Cart";

export interface ICartState {
  items: ICartItem[];
  totalPrice: number;
}

export interface ICart extends ICartState {
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
  resetCart: () => void;
}

const CartContext = React.createContext<ICart>({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  resetCart: () => {},
});

export default CartContext;
