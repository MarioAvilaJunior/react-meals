import React from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onShowCart }: { onShowCart: () => void }) => {
  const cartCtx = React.useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((totalAmount, item) => {
    return totalAmount + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export { HeaderCartButton };
