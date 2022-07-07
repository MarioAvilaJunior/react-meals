import classes from "./MealItem.module.css";
import { IMeal } from "../IMeal";
import MealItemForm from "./MealItemForm";

const MealItem = (props: IMeal) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meals}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
