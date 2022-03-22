import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formsValidity, setFormsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef("");
  const streetInputRef = useRef("");
  const postalInputRef = useRef("");
  const cityInputRef = useRef("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isEmpty = (value) => value.trim() === "";
    const isFiveChars = (value) => value.length === 5;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }


    props.onAdd({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
    //submit cart data;
  };

  const nameInputClass = !formsValidity.name
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const streetInputClass = !formsValidity.street
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const postalInputClass = !formsValidity.postal
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const cityInputClass = !formsValidity.city
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      {!formsValidity.name && <p>Enter the valid Name</p>}
      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      {!formsValidity.street && <p>Enter the valid Street</p>}
      <div className={postalInputClass}>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" id="postal-code" ref={postalInputRef} />
      </div>
      {!formsValidity.postal && <p>Enter the valid Postal Code</p>}
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      {!formsValidity.city && <p>Enter the valid City Name</p>}
      <div className={classes.actions}>
        <button onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
