import classes from './Cart.module.css';
import { Modal } from "../UI/Modal";
import { useContext, useState } from "react";
import { CartContext } from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from './Checkout';

export const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler  = (item) => {
        cartCtx.addItem(item);
    };

    const submitOrderHandler = async(userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-53718-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

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
    );

    const cartModalContent =
        <>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>{totalAmount}</span>
                <span>35.62</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </>
    ;

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent =
        <>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </>
    ;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
};