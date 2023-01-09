import React,{useContext,useState,useEffect} from 'react'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContex from '../../store/card-contex';


const HeaderCartButton = (props) => {
  const[btnIsHighlighted,setBtnIsHighlighted] = useState(false)
  const  cartCntx = useContext(CartContex);
  const {items} = cartCntx
  const cartItemNo = cartCntx.items.reduce((totalValue,currentItem)=>{
    return totalValue + currentItem.amount
  },0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`


  useEffect(()=>{
    if(items.length === 0){
      return
    }
    setBtnIsHighlighted(true)
    setTimeout(()=>{setBtnIsHighlighted(false)},300)
  },[items])

  return (
    <button className={btnClasses} onClick={props.onClickHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemNo}</span>
    </button>
  );
};

export default HeaderCartButton;