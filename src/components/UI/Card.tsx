import classes from "./Card.module.css";

interface ICardProps {
  children: React.ReactNode;
}

const Card = (props: ICardProps) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
