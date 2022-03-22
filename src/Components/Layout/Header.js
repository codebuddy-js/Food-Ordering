import { Fragment } from "react";
import classes from "./Header.module.css";
import mealImg from "../../assets/meals.jpg";
import HearderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
              <HearderCartButton onShow={props.onShow}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="A Table full of delicious foot items" />
      </div>
    </Fragment>
  );
};

export default Header;
