import classes from './HeaderCartButton.module.css';
import CartIcon from "../../Cart/CartIcon";
import { useContext, useEffect, useState } from 'react';
import { CartContext } from "../../../store/cart-context";

export const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const {items} = cartCtx;
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ' '}`;

    const numberOfCartItems = items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0);

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        //Cleanup function
        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};