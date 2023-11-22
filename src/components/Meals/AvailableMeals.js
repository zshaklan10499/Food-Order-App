import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://todo-58c05-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong !!");
      }

      const responseData = await response.json();

      let loadedMeals = [];

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  if (isLoading) {
    return <p className={classes.MealsIsLoading}>Loading...</p>;
  }

  if (error) {
    return <p className={classes.MealsIsLoading}>{error}</p>;
  }

  const mealsList = meals.map((meals) => (
    <MealItem
      key={meals.id}
      id={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));

  return (
    <div className={classes.meals}>
      <Card>{mealsList}</Card>
    </div>
  );
};

export default AvailableMeals;
