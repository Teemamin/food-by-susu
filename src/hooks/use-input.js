import { useState } from 'react';

const useInput = (checkIsValid)=>{
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);


    const isValid = checkIsValid(value)
    const isError = !isValid && isTouched;

    const inputChangeHandler = (event) => {
        setValue(event.target.value);
      };

      const inputBlurHandler = event => {
        setIsTouched(true);
      };

      const resetValue = ()=>{
        setValue('')
        setIsTouched(false)
      }


      return{
        value,
        isValid,
        isError,
        inputChangeHandler,
        resetValue,
        inputBlurHandler
      }
}

export default useInput