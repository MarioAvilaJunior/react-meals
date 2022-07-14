import React from "react";
import classes from "./Cart.module.css";
import { IMeal } from "../Meals/IMeal";
import Modal from "../UI/Modal";

export interface ICartItem extends IMeal {
  amount: number;
}

const Cart = ({ onCloseCart }: { onCloseCart: () => void }): JSX.Element => {
  const dummyMeals: ICartItem[] = [
    { id: "c1", name: "Sushi", amount: 2, price: 12.99, description: "" },
  ];
  const cartItems = (
    <ul>
      {dummyMeals.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal onClick={onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.99</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onCloseCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
