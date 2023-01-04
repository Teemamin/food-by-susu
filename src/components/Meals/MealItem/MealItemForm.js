import React from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = (props) => {
    console.log(props.id)
  return (
    <form className={classes.form}>
        <Input label='amount' input={{
            type: 'number',
            id: 'amount_' + props.id,
            defaultValue: '1',
            min: '1',
            max: '5',
            step: '1'
        }}/>
        <button type="">+ Add</button>
        
    </form>
  )
}

export default MealItemForm