import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://http-request-622c3-default-rtdb.firebaseio.com/meals.json/"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      let loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
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
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const MealItems = (
    <ul>
      {meals.map((mealItem) => (
        <MealItem
          key={mealItem.id}
          id={mealItem.id}
          title={mealItem.name}
          description={mealItem.description}
          price={mealItem.price}
        />
      ))}
    </ul>
  );

  return (
    <section className={classes.meals}>
      <Card>{MealItems}</Card>
    </section>
  );
};

export default AvailableMeals;
