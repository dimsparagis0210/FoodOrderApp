import classes from './Cart.module.css';
import { Modal } from "../UI/Modal";
import { useContext, useState } from "react";
import {CartContext} from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from './Checkout';

export const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);

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

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes['button--alt']} onClick={orderHandler}>Order</button>}
        </div>
    )

    return <Modal onClose={props.onClose}>
        <ul className={classes['cart-items']}>
            {cartItems}
        </ul>
        <div className={classes.total}>
            <span>{totalAmount}</span>
            <span>35.62</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
    </Modal>
};