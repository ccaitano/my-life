import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel, TextField, Grid} from '@mui/material';

function BucketForm(props) {
  const [input, setInput] = useState('');
  let [eagerness, setEagerness] = useState('');

  const eagernessLevel = ['high', 'medium', 'low']

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eagerness) {
      eagerness = 'low';
    }

    props.onSubmit({
      id: Math.random(Math.floor() * 1000),
      text: input,
      eagerness: eagerness,
    });

    setInput('');
    setEagerness('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // First we check to see if "edit" prop exists. If not, we render the normal form
  // If the prop "edit" exists, we know to render the update form instead
  return !props.edit ? (
    <Grid>
        <form onSubmit={handleSubmit}>
            <FormControl>
                <TextField 
                label="Write a reminder"
                type="text"
                value={input}
                onChange={handleChange}
                style={{ maxWidth: "25vw", width: "50vw"}}
                />
            {/* </FormControl> */}
            </FormControl>
            
                <div className="dropdown">
                <Button type="submit" variant="contained" color="primary" className={`dropbtn ${eagerness}`}>
                    {eagerness || 'Priority'}
                </Button>
                <div className="dropdown-content">
                    <p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
                    <p onClick={() => setEagerness(eagernessLevel[1])}>Want to</p>
                    <p onClick={() => setEagerness(eagernessLevel[2])}>If time</p>
                </div>
                </div>
                {/* <button className="bucket-button">Add Reminder</button> */}
                <Button type="submit" variant="contained" color="primary">Add Reminder</Button>
            {/* </FormControl> */}
        </form>
    </Grid>
    ) : (
    <Grid>
        <h3>Update: {props.edit.value}</h3>
        <form onSubmit={handleSubmit}>
            <FormControl>
                <TextField
                type="text"
                label={props.edit.value}
                value={input}
                onChange={handleChange}
                style={{ maxWidth: "25vw", width: "50vw"}}
                />
            </FormControl>
                <div className="dropdown">
                <Button type="submit" variant="contained" color="primary" className={`dropbtn ${eagerness}`}>
                    {eagerness || 'Priority'}
                </Button>
                <div className="dropdown-content">
                    <p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
                    <p onClick={() => setEagerness(eagernessLevel[1])}>Want to do</p>
                    <p onClick={() => setEagerness(eagernessLevel[2])}>Take it or leave it</p>
                </div>
                </div>
                <Button type="submit" variant="contained" color="primary">Update</Button>
            
        </form>
    </Grid>
  );
}

export default BucketForm;
