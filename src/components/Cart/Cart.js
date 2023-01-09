import React,{useContext} from 'react'
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContex from '../../store/card-contex';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContex);
    const hasItems = cartCtx.items.length > 0
   
    const removeItemHandler = (id)=>{
        console.log(id)
        cartCtx.removeItem(id)
    }

    const addItemHandler = (item)=>{
        cartCtx.addItem(item)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
          {cartCtx.items.map((item) => (
            <CartItem key = {item.id.toString()} 
            id = {item.id} name={item.name} price={item.price}
             amount={item.amount} onRemove={removeItemHandler.bind(null, item.id)}
              onAdd={addItemHandler.bind(null, item)} />
          ))}
        </ul>
      );
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
      return (
        <Modal onClose={props.onCloseCart}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
          </div>
        </Modal>
      );
}

export default Cart