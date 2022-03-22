import classes from "./MealItem.module.css";
import MealForm from "./MealForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemsHandler = (amount) => {
    return cartCtx.addItem({
      id: props.id,
      name: props.title,
      price: props.price,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.title}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>₹ {props.price}</div>
      </div>
      <div>
        <MealForm onAdd={addItemsHandler} />
      </div>
    </li>
  );
};

export default MealItem;
