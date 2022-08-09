import React from "react";
import useInput from "../../hooks/useInput";
import useHTTP from "../../hooks/useHTTP";
import classes from "./CheckoutForm.module.css";
import { ICartItem } from "../Cart/Cart";

export interface IUser {
  name: string;
  address: string;
}

const validateText = (text: string) => {
  return text.trim().length > 0;
};

interface ICheckoutFormProps {
  onClose: () => void;
  onSubmitRequest: (userData: IUser) => void;
}

const CheckoutForm = ({
  onClose,
  onSubmitRequest,
}: ICheckoutFormProps): JSX.Element => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    inputHasError: nameWasInvalidated,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(validateText);

  const {
    value: address,
    valueIsValid: addressIsValid,
    inputHasError: addressWasInvalidated,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(validateText);

  const formIsValid = nameIsValid && addressIsValid;

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    resetName();
    resetAddress();
    onClose();
    const userData: IUser = {
      name: name,
      address: address,
    };
    onSubmitRequest(userData);
  };

  const nameErrorClasses = `${classes["control"]}${
    nameWasInvalidated ? ` ${classes["invalid"]}` : ""
  }`;

  const addressErrorClasses = `${classes["control"]}${
    addressWasInvalidated ? ` ${classes["invalid"]}` : ""
  }`;

  return (
    <form onSubmit={formSubmissionHandler} className={classes.form}>
      <div className={nameErrorClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameWasInvalidated && (
          <p className={classes["error-text"]}>Name must not be empty</p>
        )}
      </div>
      <div className={addressErrorClasses}>
        <label htmlFor="address">Your Adress</label>
        <input
          type="text"
          id="address"
          required
          value={address}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        />
        {addressWasInvalidated && (
          <p className="error-text">Address must not be empty</p>
        )}
      </div>
      <div
        className={classes.actions}
        style={{
          display: "flex",
          gap: "50px",
          justifyContent: "flex-start",
        }}
      >
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={!formIsValid}
          className={classes.submit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
