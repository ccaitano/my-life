import React from 'react';
import {Box} from '@mui/material';
const Quote = () => { 
  
  const affirmations = [ "Hey you got this!", "The perfect moment is this one" , "I am deliberate and afraid of nothing" , 'Your perspective is unique. It’s important and it counts', 'Every day above earth is a good day', 'Nothing can dim the light that shines from within', 'You must do the things you think you cannot do', 'I can. I will. End of story.' ]; 
  const randomNumber = Math.floor(Math.random()* affirmations.length);
  // sx={{ flexGrow: 1, backgroundColor: '#BDB2FF', color: 'black', width: '99%', borderRadius: '12px' }}
  return (  
    <Box sx={{ flexGrow: 1, backgroundColor: '#BDB2FF', color: 'black', width: '99%', borderRadius: '12px' }}> 
      <h1>Positive Affirmation</h1>
      <p>{affirmations[randomNumber]}</p>
    </Box>    
  ) 
};

export default Quote;