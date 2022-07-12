import React from "react";
import CartContext, { ICart, ICartState } from "./cart-context";
import { ICartItem } from "../components/Cart/Cart";

enum CartActionType {
  ADD_CART_ITEM = "ADD_CART_ITEM",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
}

interface ICartAction {
  type: CartActionType;
  item?: ICartItem;
  id?: string;
}

const defaultCartState: ICartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state: ICartState, action: ICartAction): ICartState => {
  switch (action.type) {
    case CartActionType.ADD_CART_ITEM: {
      const updatedItemArray = state.items.concat(action.item!);
      const { price, amount } = action.item!;
      const updatedTotalPrice = state.totalPrice + price * amount;
      return {
        items: updatedItemArray,
        totalPrice: updatedTotalPrice,
      };
    }
    case CartActionType.REMOVE_CART_ITEM: {
    }
  }
  return { ...state };
};

const CartProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const [cartState, dispatchCartAction] = React.useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: ICartItem): void => {
    dispatchCartAction({ type: CartActionType.ADD_CART_ITEM, item: item });
  };
  const removeItemFromCartHandler = (id: string): void => {
    dispatchCartAction({ type: CartActionType.REMOVE_CART_ITEM, id: id });
  };

  const cartContext: ICart = {
    items: [],
    totalPrice: 0,
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
