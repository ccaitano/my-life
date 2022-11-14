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
import '../css/index.css';
import { borderRight } from '@mui/system';
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
    <Paper sx={{ maxWidth: 936, m: 'auto', overflow: 'hidden', backgroundColor: '#FFFBF8', borderRadius: '20px', p: 2 }}>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 5, width: '25ch' }, 
      }}
      noValidate
      autoComplete="off"
      height={4}
    >
    </Box>
    {/* <div backgroundColor='#ffadad'> */}
    <Typography variant='h4' fontFamily='Oswald' sx={{p:3}}>Search for Existing Users</Typography>
      <AppBar
        position="static"
        color="default"
        backgroundcolor="#081c15"
        elevation={1}
        sx={{width: '50vw', margin: 'auto', backgroundColor: "#4B80A8", borderRadius: '20px'}}
        // sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', backgroundColor: '#ffadad', borderRight: 50, borderLeft: 50, borderBottom: 10, borderColor: '#A0C4FF', borderRadius: 10}}
      >
        <Toolbar sx={{ alignItems: "center", p: 2, backgroundColor: "#4B80A8", borderRadius: '20px'}}>
          <Grid container spacing={5} sx={{ alignItems: "center", m: 2}}>
            <Grid item xs sx={{display: 'flex'}}>
              <TextField
                fullWidth
                id="outlined-basic" label="Search Users" variant="outlined"
                placeholder="Search by Username"
                InputProps={{  
                  sx: { fontSize: 'default', disableUnderline: true, backgroundColor: "#FFFBF8"},
                }} 
                 
                // style
                value={wordEntered}
                onChange={handleFilter}
              />
              
              <div>
                {filteredData.length === 0 ? (
                  <SearchIcon sx={{display: "flex", alignItems: "center", p: 2}}/>
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
      {/* </div> */}
      <Typography sx={{ my: 25, mx: 10 }} color="#081c15" align="center"> 
             {filteredData.length !== 0 && (
        <div>
          {filteredData.slice(0, 15).map((value) => {
            return (
              <div key={value}>
                <a className="dataItem" href={value.link} onClick={confirmFunk} cursor='grab'>
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