import classes from "./Cart.module.css";
import { IMeal } from "../Meals/IMeal";
import Modal from "../UI/Modal";

interface ICartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

const Cart = (): JSX.Element => {
  const dummyMeals: ICartItem[] = [
    { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
  ];
  const cartItems = (
    <ul>
      {dummyMeals.map((item) => {
        return <li>{item.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.99</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
