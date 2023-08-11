import classes from './Cart.module.css';
import { Modal } from "../UI/Modal";
import { useContext } from "react";
import {CartContext} from "../../store/cart-context";
import CartItem from "./CartItem";

export const Cart = props => {
    const cartCtx = useContext(CartContext);

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler  = (item) => {
        cartCtx.addItem(item);
    };

    const cartItems = cartCtx.items.map(item =>
        <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        >
            {item.name}
        </CartItem>
    );



    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    return <Modal onClose={props.onClose}>
        <ul className={classes['cart-items']}>
            {cartItems}
        </ul>
        <div className={classes.total}>
            <span>{totalAmount}</span>
            <span>35.62</span>
        </div>
        <div className={classes.actions}>
            {hasItems && <button className={classes['button--alt']}>Order</button>}
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </Modal>
};