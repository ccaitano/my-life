/* eslint-disable no-restricted-globals */
import React from 'react';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {useQuery} from '@apollo/react-hooks';
import {QUERY_USERS} from '../utils/queries';
import Box from '@mui/material/Box';
const Content = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const {data} = useQuery(QUERY_USERS); 
  let users = data?.users ||[];
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    let userEmail = users.map(function (value){
      return value.email;
    });
    const newFilter = userEmail.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    }
     else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  function confirmFunk(){
 console.log('I work');
 if( confirm('Add this user?')){
//if user wants to add new friend send info to other user profile here
console.log('I am true');
 } else {
  console.log('I am false');
// if user does not want to add new friend do nothing
 }
  }
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Box
      component="form"
      // sx={{
      //   '& > :not(style)': { m: 1, width: '25ch' },
      // }}
      noValidate
      autoComplete="off"
      height={4}
    >
    </Box>
      <AppBar
        position="static"
        color="default"
        elevation={4}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
      >
        <Toolbar>
          <Grid container spacing={5} sx={{ alignItems: "center"}}>
            <Grid item>
            </Grid>
            <Grid item xs >
              <TextField
                fullWidth
                id="outlined-basic" label="Search Users" variant="outlined"
                placeholder="Search by Username"
                InputProps={{  
                  
                  sx: { fontSize: 'default', disableUnderline: true},
                }} 
                 
                // style
                value={wordEntered}
                onChange={handleFilter}
              />
              <div>
          {filteredData.length === 0 ? (
            <SearchIcon sx={{alignItems: "left"}}/>
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </Toolbar> 
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center"> 
             {filteredData.length !== 0 && (
        <div>
          {filteredData.slice(0, 15).map((value) => {
            return (
              <div key={value}>
                <a className="dataItem" href={value.link} onClick={confirmFunk}>
                  <span>{value}</span>
                </a>
              </div>
            );
          })}
        </div>
      )}
      </Typography>
    </Paper>
  );
}

export default Content;