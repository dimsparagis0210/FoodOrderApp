import classes from './Header.module.css';
import meals from '../../../assets/meals.jpg';
import {HeaderCartButton} from "../HeaderCartButton/HeaderCartButton";

export const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={meals} alt="Meals"/>
            </div>
        </>
    );
}