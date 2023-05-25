import React, { Fragment, useContext } from 'react';

import CartIcon from "../Cart/cartIcon"
import CartContext from '../../store/Cart-context';
import classes from "./HeaderCartButton.module.css";

const HeaderCartButon = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0)
  
  return (
    <Fragment>
      <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </Fragment>
  )
}

export default HeaderCartButon;
