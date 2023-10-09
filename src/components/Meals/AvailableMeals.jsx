import classes from './AvailableMeals.module.css'
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
import { useEffect, useState } from 'react';


export const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //The use of the inner function fecthMeals() is done because useEffect can't accept async functions
    useEffect(() => {
        setIsLoading(true);

        const fetchMeals = async() => {
            const response = await fetch(
                'https://react-http-53718-default-rtdb.firebaseio.com/meals.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseData = await response.json();
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description:responseData[key].description,
                    price :responseData[key].price
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return <section className={classes.mealsError}>
            <p>{error}</p>
        </section>
    }

    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        >
            {meal.name}
        </MealItem>
    );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};