import React, { Fragment } from "react";

import reactMeals from "../../assets/React-meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButon from "./HeaderCartButon";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FoodStore</h1>
        <HeaderCartButon onClick={props.onShowCartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={reactMeals} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
