import React,{useContext, useState} from 'react'
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContex from '../../store/card-contex';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {
    const cartCtx = useContext(CartContex);
    const hasItems = cartCtx.items.length > 0
    const[showCheckout, setShowCheckout] = useState(false)
    const[isSubmitting, setIsSubmitting] =  useState(false)
    const[didSubmit, setDidSubmit] =  useState(false)


    const confirmOrderHandler = async (userData)=>{
      setIsSubmitting(true)
      const response = await fetch('https://teemamin-react-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          userData: userData,
          orderedItems: cartCtx.items
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setIsSubmitting(false)
      setDidSubmit(true)
      cartCtx.clearCart()
      console.log(data);
      
    
    }
   
    const removeItemHandler = (id)=>{
        console.log(id)
        cartCtx.removeItem(id)
    }

    const addItemHandler = (item)=>{
        cartCtx.addItem(item)
    }
    
    const checkoutFormHandler = ()=>{
      setShowCheckout(true)
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
    const modalActions = <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
      {hasItems && <button onClick={checkoutFormHandler} className={classes.button}>Order</button>}
    </div>
    const modalContent = <>
        {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {showCheckout && <Checkout onCancel={props.onCloseCart} onConfirm={confirmOrderHandler}/>}
          { !showCheckout && modalActions}
    
    </>
    const submitMessage = <>
        <p>Order success</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>Close</button>
        </div>
      </>
      return (
        <Modal onClose={props.onCloseCart}>
          {isSubmitting ? <p>Submitting....</p> : didSubmit ?
          submitMessage : modalContent}
        </Modal>
      );
}

export default Cart