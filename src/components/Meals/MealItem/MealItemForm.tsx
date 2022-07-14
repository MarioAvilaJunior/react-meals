import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import React from "react";
import { ICartItem } from "../../Cart/Cart";

interface IMealItemForm {
  id: string;
  onAddItem: (amount: number) => void;
}

const MealItemForm = (props: IMealItemForm): JSX.Element => {
  const [isValid, setIsValid] = React.useState(true);
  const amountInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
      props.onAddItem(enteredAmountNumber);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!isValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
