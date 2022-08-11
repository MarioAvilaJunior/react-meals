import React from "react";
import CartContext, { ICart, ICartState } from "./cart-context";
import { ICartItem } from "../components/Cart/Cart";

enum CartActionType {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  RESET_CART,
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
  let existingCartItemIndex: number;
  let updatedItems: ICartItem[];
  let existingCartItem: ICartItem;
  let updatedTotalPrice: number;
  switch (action.type) {
    case CartActionType.ADD_CART_ITEM: {
      const { price, amount } = action.item!;
      updatedTotalPrice = state.totalPrice + price * amount;

      existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item?.id;
      });

      existingCartItem = state.items[existingCartItemIndex];
      updatedItems = state.items.concat(action.item!);
      if (existingCartItem) {
        updatedItems = [...state.items];
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item!.amount,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }
    case CartActionType.REMOVE_CART_ITEM: {
      existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.id;
      });
      existingCartItem = { ...state.items[existingCartItemIndex] };
      existingCartItem.amount -= 1;
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = existingCartItem;
      if (existingCartItem.amount === 0) {
        updatedItems = state.items.filter((item) => {
          return item.id != existingCartItem.id;
        });
      }
      updatedTotalPrice = state.totalPrice - existingCartItem.price;
      return {
        ...state,
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    }
    case CartActionType.RESET_CART: {
      return defaultCartState;
    }
  }
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
  const resetCartHandler = (): void => {
    dispatchCartAction({ type: CartActionType.RESET_CART });
  };

  const cartContext: ICart = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetCart: resetCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
