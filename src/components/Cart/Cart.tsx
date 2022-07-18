import React from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import { IMeal } from "../Meals/IMeal";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

export interface ICartItem extends IMeal {
  amount: number;
}

const Cart = ({ onCloseCart }: { onCloseCart: () => void }): JSX.Element => {
  const cartCtx = React.useContext(CartContext);

  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;

  const isValidOrder = cartCtx.items.length > 0;

  const removeItemHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const addItemHandler = (item: ICartItem) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            description={item.description}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addItemHandler}
            onRemove={removeItemHandler}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClick={onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onCloseCart}>
          Close
        </button>
        {isValidOrder && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
