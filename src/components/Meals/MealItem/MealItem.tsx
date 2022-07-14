import React from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import { IMeal } from "../IMeal";
import MealItemForm from "./MealItemForm";
import { ICartItem } from "../../Cart/Cart";

const MealItem = (props: IMeal) => {
  const cartCtx = React.useContext(CartContext);

  const addToCartHandler = (amount: number): void => {
    const newCartItem: ICartItem = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: amount,
    };
    cartCtx.addItem(newCartItem);
  };

  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meals}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddItem={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
