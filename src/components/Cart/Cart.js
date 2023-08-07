import classes from './Cart.module.css';
import { Modal } from "../UI/Modal";

export const Cart = props => {
    const cartItems = [{id: 'c1', name: 'sushi', amount: 2, price: 12.99}].map(item => <li>{item.name}</li>);
    return <Modal onClose={props.onClose}>
        <ul className={classes['cart-items']}>
            {cartItems}
        </ul>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>35.62</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']}>Order</button>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </Modal>
};