import React from "react";
import Card from "../UI/Card";
import { IMeal } from "./IMeal";
import MealItem from "./MealItem/MealItem";
import useHTTP from "../../hooks/useHTTP";
import { databaseURL } from "../../App";

const AvailableMeals = () => {
  const [meals, setMeals] = React.useState<IMeal[]>([]);

  const { isLoading, error, sendHTTPRequest: getAllMeals } = useHTTP<IMeal[]>();

  React.useEffect(() => {
    const transformMeals = (dataObj: IMeal[]): void => {
      const loadedMeals: IMeal[] = [];

      for (const taskKey in dataObj) {
        loadedMeals.push({
          id: taskKey,
          name: dataObj[taskKey].name,
          description: dataObj[taskKey].description,
          price: dataObj[taskKey].price,
        });
      }
      setMeals(loadedMeals);
    };

    getAllMeals(databaseURL + "/meals.json", transformMeals);
  }, [getAllMeals]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              description={meal.description}
              name={meal.name}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </>
  );
};

export default AvailableMeals;
