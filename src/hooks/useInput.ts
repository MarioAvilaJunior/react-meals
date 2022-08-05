import React from "react";

const useInput = (validityFunction: (value: string) => boolean) => {
  const [value, setValue] = React.useState<string>("");
  const [valueWasTouched, setValueWasTouched] = React.useState<boolean>(false);
  const valueIsValid = validityFunction(value);
  const inputHasError = !valueIsValid && valueWasTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setValueWasTouched(true);
  };

  const reset = () => {
    setValue("");
    setValueWasTouched(false);
  };

  return {
    value,
    valueIsValid,
    inputHasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
