import React, { useState } from 'react'
import Header from './components/Layout/Header';
import './App.css';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CardContexProvider from './store/CardContexProvider';

function App() {
  const[cartIsShowing,setCartIsShowing] = useState(false)

  const showCartHandler = ()=>{
    setCartIsShowing(true)
  }

  const hideCartHandler = ()=>{
    setCartIsShowing(false)
  }
  return (
    <CardContexProvider>
   {cartIsShowing && <Cart onCloseCart={hideCartHandler}/>}
     <Header onShowCart = {showCartHandler}/>
     <main>
      <Meals />
     </main>
    </CardContexProvider>
  );
}

export default App;
