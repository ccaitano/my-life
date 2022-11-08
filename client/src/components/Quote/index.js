import { useState } from 'react'; 
import { Button } from './Button.js'; 
import { ListComponent } from './ListComponent.js'; 

const Quote = () => { 
  
  const affirmations = [ "Hey you got this!", "The perfect moment is this one" , "I am deliberate and afraid of nothing" , 'Your perspective is unique. It’s important and it counts', 'Every day above earth is a good day', 'Nothing can dim the light that shines from within', 'You must do the things you think you cannot do', 'I can. I will. End of story.' ]; 
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