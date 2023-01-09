import React,{useContext} from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'
import CartContex from '../../store/card-contex'

function Header(props) {
 const  cartCntx = useContext(CartContex);
  return (
    <>
         <header className={classes.header}>
        <h1>Meals By Susu</h1>
        <HeaderCartButton onClickHandler ={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </>
  )
}

export default Header