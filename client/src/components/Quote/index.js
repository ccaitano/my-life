import { useState } from 'react'; 
import { Button } from './Button.js'; 
import { ListComponent } from './ListComponent.js'; 

function Quote() { 
  
  const [components, setComponents] = useState(["Hey you got this!"]); 
  const [componentNames] = useState([ 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7' ]); 
  
  function addComponent() { 
    
    if (componentNames.length > 0) { 
      
      setComponents([...components, componentNames[0]]);
      componentNames.splice(0, 1);
      
    } 
  } 

    console.log("yoooo whats good"); 
  return ( 
    
    <div> 
    
      <Button onClick={addComponent} text="Get a new affermation"/> 
      {components.map((item, i) => ( <ListComponent text={item} /> ))} 
      
    </div> 
    
  ) 
  
} 

export default Quote;