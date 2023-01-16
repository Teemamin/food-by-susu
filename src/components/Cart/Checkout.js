import React from 'react'
import classes from './Checkout.module.css'
import useInput from '../../hooks/use-input';


const Checkout = (props) => {
    const {
        value: enteredName,
          isValid: enteredNameIsValid,
          isError: enteredNameNotValid,
          inputChangeHandler: nameChangeHandler,
          resetValue: resetName,
          inputBlurHandler: nameBlurHandler
      } = useInput(val=>val.trim() !== '')

      const {
        value: enteredStreet,
          isValid: enteredStreetIsValid,
          isError: enteredStreetNotValid,
          inputChangeHandler: streetChangeHandler,
          resetValue: resetstreet,
          inputBlurHandler: streetBlurHandler
      } = useInput(val=>val.trim() !== '')

      const {
        value: enteredCity,
          isValid: enteredCityIsValid,
          isError: enteredCityNotValid,
          inputChangeHandler: cityChangeHandler,
          resetValue: resetCity,
          inputBlurHandler: cityBlurHandler
      } = useInput(val=>val.trim() !== '')

      const {
        value: enteredPostcode,
          isValid: enteredPostcodeIsValid,
          isError: enteredPostcodeNotValid,
          inputChangeHandler: postcodeChangeHandler,
          resetValue: resetPostcode,
          inputBlurHandler: postcodeBlurHandler
      } = useInput(val=>val.trim().length === 5)


    const confirmHandler = (event) => {
      event.preventDefault();
      let formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostcodeIsValid
      if(!formIsValid){
        console.log('not valid')
        return
      }
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postcode: enteredPostcode,
        city: enteredCity
        })
      resetName()
      resetstreet()
      resetPostcode()
      resetCity()
    };
  
    return (
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={enteredNameNotValid ? `${classes.control} ${classes.invalid}` : classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
          {enteredNameNotValid && (
          <p className='error-text'>Name must not be empty.</p>
        )}
        </div>
        <div className={enteredStreetNotValid ? `${classes.control} ${classes.invalid}` : classes.control}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' value={enteredStreet} onChange={streetChangeHandler} onBlur={streetBlurHandler}/>
          {enteredStreetNotValid && (
          <p className='error-text'>Street must not be empty.</p>
        )}
        </div>
        <div className={enteredPostcodeNotValid ? `${classes.control} ${classes.invalid}` : classes.control}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' value={enteredPostcode} onChange={postcodeChangeHandler} onBlur={postcodeBlurHandler} />
          {enteredPostcodeNotValid && (
          <p className='error-text'>PostCode must not be empty and should be 5 chars.</p>
        )}
        </div>
        <div className={enteredCityNotValid ? `${classes.control} ${classes.invalid}` : classes.control}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' value={enteredCity} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
          {enteredCityNotValid && (
          <p className='error-text'>City must not be empty.</p>
        )}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
  };
  


export default Checkout