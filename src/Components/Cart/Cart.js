import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItems from "./CartItems";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const addItemHandler = (item) => {
    console.log(item);
    console.log({ ...item });

    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHander = (id) => {
    cartCtx.removeItem(id);
  };

  const openOrderHandler = () => {
    setIsCheckout(true);
  };

  const submitHandler = async (userData) => {

    setIsSubmit(true);
    await fetch(
      "https://http-request-622c3-default-rtdb.firebaseio.com/orders.json/",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
      setIsSubmit(false)
    setDidSubmit(true);
    cartCtx.clearItem();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItems
          key={item.id}
          id={item.id}
          title={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHander.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHide}>
        Close
      </button>
      <button className={classes.button} onClick={openOrderHandler}>
        Open
      </button>
    </div>
  );

  const modalJSX = (
    <Fragment>
      
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹ {cartCtx.totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHide} onAdd={submitHandler} />}
      {!isCheckout && modalActions}
   </Fragment>
   
  );

  const isSubmittingModalContent = <p>Sending Data to Server...</p>;

  const didSubmitModalContent = <Fragment>
    <p>Submitted Successfully</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onHide}>Close</button>
    </div>
  </Fragment>

  return (
    <Modal onHide={props.onHide}>
      {!isSubmit && !didSubmit && modalJSX}
      {isSubmit && !didSubmit && isSubmittingModalContent}
      {!isSubmit && didSubmit && didSubmitModalContent}
       
    </Modal>
  );
};
export default Cart;
