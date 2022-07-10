import React from "react";
import CartContext, { ICart } from "./cart-context";
import { ICartItem } from "../components/Cart/Cart";

const CartProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const addItemToCartHandler = (item: ICartItem): void => {};

  const removeItemFromCartHandler = (id: string): void => {};

  const cartContext: ICart = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
