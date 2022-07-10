import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import { HeaderCartButton } from "./HeaderCartButton";

interface HeaderProps {
  onShowCart: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <div style={{ textAlign: "center" }}>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </div>
  );
};

export { Header };
