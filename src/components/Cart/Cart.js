import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/Cart-context";
import CartItem from "./CartItem";
import Checkout from "./checkout";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [orderButton, setOrderButton] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderButtonHandler = () => {
    setOrderButton(true);
  };

  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://todo-58c05-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
      <div className={classes["cart-items"]}>{cartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {orderButton && (
        <Checkout
          onCancel={props.onHideCartHandler}
          onConfirm={submitHandler}
        />
      )}

      {!orderButton && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onHideCartHandler}
          >
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderButtonHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const submitMessage = <p>Sending order data...</p>;
  const didSubmitMessage = (
    <React.Fragment>
      <p>Successfully placed the order!!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onHideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submitMessage}
      {!isSubmitting && didSubmit && didSubmitMessage}
    </Modal>
  );
};

export default Cart;
