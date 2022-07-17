import { ICart } from "../../store/cart-context";
import { ICartItem } from "./Cart";
import classes from "./CartItem.module.css";

interface ICartItemProps extends ICartItem {
  onRemove: (id: string) => void;
  onAdd: (item: ICartItem) => void;
}

const CartItem = (props: ICartItemProps): JSX.Element => {
  const price = `$${props.price.toFixed(2)}`;

  const onRemove = (): void => {
    props.onRemove(props.id);
  };

  const onAdd = (): void => {
    props.onAdd({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: props.amount,
    });
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
