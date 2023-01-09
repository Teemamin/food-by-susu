import React,{useContext,useRef,useState} from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import CartContex from '../../../store/card-contex'


const MealItemForm = (props) => {
  const[amountIsValid,setAmountIsValid] = useState(true)
  const cartCntx = useContext(CartContex)
  const inputRef = useRef()

  const submitHandler = (evnt)=>{
    evnt.preventDefault()
    const enteredAmount = inputRef.current.value
    const enteredAmountNumber = +enteredAmount // a hack to convert the input to number
    if(enteredAmount.trim() === 0 || enteredAmountNumber < 0 || enteredAmountNumber > 5){
      setAmountIsValid(false)
      return
    }
    props.onAddToCart(enteredAmountNumber)
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
        <Input ref={inputRef} label='amount' input={{
            type: 'number',
            id: 'amount_' + props.id,
            defaultValue: '1',
            min: '1',
            max: '5',
            step: '1'
        }}/>
        <button type="">+ Add</button>
        {!amountIsValid && <p>{inputRef.current.value} is not a valid input, valid input is (1-5)</p>}
    </form>
  )
}

export default MealItemForm