import React from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import { IMeal } from "../Meals/IMeal";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CheckoutForm, { IUser } from "../UI/CheckoutForm";
import { databaseURL } from "../../App";

export interface ICartItem extends IMeal {
  amount: number;
}

interface IRequest {
  user: IUser;
  cart: ICartItem[];
}

interface ICartProps {
  onCloseCart: () => void;
}

const Cart = ({ onCloseCart }: ICartProps): JSX.Element => {
  const cartCtx = React.useContext(CartContext);
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const isValidOrder = cartCtx.items.length > 0;

  const removeItemHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const addItemHandler = (item: ICartItem) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const closeForm = (): void => {
    setShowForm(false);
  };

  const openForm = (): void => {
    setShowForm(true);
  };

  const submitRequest = async (userData: IUser) => {
    setSubmitting(true);
    await fetch(databaseURL + "/requests.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        items: cartCtx.items,
      }),
    });
    setSubmitting(false);
    setSubmitted(true);
    cartCtx.resetCart();
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

  const modalActions = (
    <>
      <button className={classes["button--alt"]} onClick={onCloseCart}>
        Close
      </button>
      {isValidOrder && (
        <button className={classes.button} onClick={openForm}>
          Order
        </button>
      )}
    </>
  );

  const submittingCard = <div>Submitting request...</div>;
  const requestSubmitted = (
    <>
      <p>Request submitted!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onCloseCart}>
          Close
        </button>
      </div>
    </>
  );

  const modal = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      {showForm && (
        <CheckoutForm onClose={closeForm} onSubmitRequest={submitRequest} />
      )}
      <div className={classes.actions}>{!showForm && modalActions}</div>
    </>
  );
  return (
    <Modal onClick={onCloseCart}>
      {submitted && requestSubmitted}
      {submitting && submittingCard}
      {!submitting && !submitted && modal}
    </Modal>
  );
};

export default Cart;
