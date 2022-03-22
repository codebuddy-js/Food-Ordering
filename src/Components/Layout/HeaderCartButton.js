import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HearderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

    const { items:myItem } = cartCtx;
  const badgeValue = myItem.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClass = `${classes.button} ${btnIsHighLighted ? classes.bump : ""}`;

  useEffect(() => {
    if (myItem.length === 0) {
      return;
    } 
      const timer = setTimeout(() => {
        setBtnIsHighLighted(true);
      }, 300);

    return () => {
      clearTimeout(timer);
      setBtnIsHighLighted(false);
    };
  }, [myItem]);

  return (
    <button className={btnClass} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}>{badgeValue}</span>
    </button>
  );
};

export default HearderCartButton;
