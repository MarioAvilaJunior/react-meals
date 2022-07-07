import classes from "./Input.module.css";

interface IInputProps {
  label: string;
  input: {
    id?: string;
    type?: string;
    min?: string;
    max?: string;
    step?: string;
    defaultValue?: string;
  };
}

const Input = (props: IInputProps) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
