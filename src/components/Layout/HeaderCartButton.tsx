import React from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onShowCart }: { onShowCart: () => void }) => {
  const cartCtx = React.useContext(CartContext);
  const [buttonBump, setButtonBump] = React.useState<boolean>(false);

  const { items } = cartCtx;

  const buttonClasses = `${classes.button} ${buttonBump ? classes.bump : ""}`;

  React.useEffect(() => {
    /*  if (items.length === 0) {
      return;
    } */
    setButtonBump(true);

    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = cartCtx.items.reduce((totalAmount, item) => {
    return totalAmount + item.amount;
  }, 0);

  return (
    <button className={buttonClasses} onClick={onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export { HeaderCartButton };
