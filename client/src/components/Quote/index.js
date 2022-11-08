import { useState } from 'react'; 
import { Button } from './Button.js'; 
import { ListComponent } from './ListComponent.js'; 

const Quote = () => { 
  
  const affirmations = [ "Hey you got this!", 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7' ]; 
  const randomNumber = Math.floor(Math.random()* affirmations.length);
  
  return (  
    <div> 
      <h1>Positive Affirmation</h1>
      {/* <Button onClick={addComponent} text="Get a new affermation"/>  */}
      <p>{affirmations[randomNumber]}</p>
    </div>    
  ) 
};

export default Quote;