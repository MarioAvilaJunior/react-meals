import React from "react";
import useInput from "../../hooks/useInput";
import useHTTP from "../../hooks/useHTTP";
import classes from "./CheckoutForm.module.css";
import Modal from "./Modal";
import { ICartItem } from "../Cart/Cart";
import { databaseURL } from "../../App";

interface IMealRequest extends ICartItem {
  name: string;
  address: string;
}

const validateText = (text: string) => {
  return text.trim().length > 0;
};

const CheckoutForm = ({ onClose }: { onClose: () => void }): JSX.Element => {
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

  const {
    isLoading,
    error,
    sendHTTPRequest: postData,
  } = useHTTP<IMealRequest[]>();

  const formIsValid = nameIsValid && addressIsValid;

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    resetName();
    resetAddress();
    /*postData(databaseURL, () => {}, {
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "requests/json",
      },
    });*/
    onClose();
  };

  const nameErrorClasses = `${classes["form-control"]}${
    nameWasInvalidated ? ` ${classes["invalid"]}` : ""
  }`;

  const addressErrorClasses = `${classes["form-control"]}${
    addressWasInvalidated ? ` ${classes["invalid"]}` : ""
  }`;

  return (
    <Modal onClick={onClose}>
      <form onSubmit={formSubmissionHandler}>
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
          className="form-actions"
          style={{
            display: "flex",
            gap: "50px",
            justifyContent: "flex-start",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className={classes["button--alt"]}
          >
            Cancel
          </button>
          <button type="submit" disabled={!formIsValid}>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
