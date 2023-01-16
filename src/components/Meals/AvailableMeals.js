import React,{useState,useEffect} from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


function AvailableMeals() {
  const[meals,setMeals] = useState([])
  const[isLoading,setIsLoading] = useState(true)
  const[httpError,setHttpError]= useState(null)


  useEffect(()=>{
    const fetchMeals = async ()=>{
      const response = await fetch('https://teemamin-react-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

      if(!response.ok){
        throw new Error("something went wrong fetching the data")
      }
      const data = await response.json();
      let transformedData = []
      for(const meal in data){
        transformedData.push({...data[meal],id:meal})
      }
      setMeals(transformedData)
     setIsLoading(false)
    }

    fetchMeals().then(()=>console.log('success')).catch(err=>{
      setIsLoading(false)
      setHttpError(err.message)
    })
  },[])
  
  
  const mealsList = meals.map((meal) => (
        <MealItem
          key={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
          id={meal.id}
        />
      ));
  return (
    <section className={classes.meals}>
        <Card>
            {isLoading ? <p>Loading....</p> : httpError ? <p>{httpError}</p> : mealsList}
        </Card>
        
    </section>
  )
}

export default AvailableMeals