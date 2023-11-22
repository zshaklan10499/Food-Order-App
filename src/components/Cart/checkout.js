import { useRef, useState } from "react";

import classes from "./checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixDigitLong = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    address: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();

  function confirmHandler(event) {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredPostal = postalRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isSixDigitLong(enteredPostal);

    setFormIsValid({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    if (
      !enteredNameIsValid &&
      !enteredAddressIsValid &&
      !enteredCityIsValid &&
      !enteredPostalIsValid
    ) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      postal: enteredPostal,
    });

    event.target.reset();
  }

  const nameClasses = `${classes.control} ${
    formIsValid.name ? "" : classes.invalid
  }`;
  const addressClasses = `${classes.control} ${
    formIsValid.address ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formIsValid.city ? "" : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    formIsValid.postal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formIsValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressRef} />
        {!formIsValid.address && <p>Please enter a valid address.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formIsValid.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formIsValid.postal && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
