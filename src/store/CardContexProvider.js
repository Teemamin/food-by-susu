import React,{useReducer} from 'react'
import CartContex from './card-contex'

const initialState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action)=>{
    if(action.type === 'ADD'){
        //check if the item is already in the cart
        //if so: item.amount + action.item.amount
        let updatedItems;
        if(state.items.find(itm => itm.id === action.item.id)){
           updatedItems = state.items.map(i=>{
              return  i.id === action.item.id ? {...i, amount: i.amount + action.item.amount} : i
           })
        }else{
            // else the item is newly added to the cart
            updatedItems = [...state.items, action.item]
        }
        // const updatedItems = state.items.concat(action.item)
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        return{items: updatedItems, totalAmount:updatedTotalAmount}
    }
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
          updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
          const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount
        };
      }
    
    return initialState
}

const CardContexProvider = (props) => {
    const [cartState, dispatchFn] = useReducer(cartReducer,initialState)

    const addItemToCartHandler = (item)=>{
        dispatchFn({type: 'ADD', item:item})
    }

    const removeItemFromCartHandler = (id)=>{
        dispatchFn({ type: 'REMOVE', id: id });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
  return (
    <CartContex.Provider value={cartContext}>
        {props.children}
    </CartContex.Provider>
  )
}

export default CardContexProvider