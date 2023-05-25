import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredAmountNumber = 1;

    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler} >
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm;
