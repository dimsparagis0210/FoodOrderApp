import classes from './AvailableMeals.module.css'
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
import { useEffect, useState } from 'react';


export const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    //The use of the inner function fecthMeals() is done because useEffect can't accept async functions
    useEffect(() => {
        const fetchMeals = async() => {
            const response = await fetch('https://react-http-53718-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description:responseData[key].description,
                    price :responseData[key].price
                })
            }
            setMeals(loadedMeals);
        };

        fetchMeals();
    }, []);

    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        >
            {meal.name}
        </MealItem>);
    return (
        <section className={classes.meals}>
            <Card>
                <ul >
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};