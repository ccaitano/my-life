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
import '../css/index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SearchFriendUpTheme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#424242'
    } ,
  }
});

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
  <ThemeProvider theme={SearchFriendUpTheme}>
    <Paper sx={{ flexGrow: 1, ml: 2, mr: 4, display: 'flex', flexDirection: 'column', backgroundColor: '#FFFBF8', borderRadius: '16px', p: 2, alignItems:'center', backgroundColor: '#D6CAD8'}}>
    {/* <div backgroundColor='#ffadad'> */}
    <Typography variant='h4' fontFamily='Oswald' sx={{p:3}}>Search for Existing Users</Typography>
      <AppBar
       position="static"
        color="default"
        elevation={3}
        sx={{width: '100%', margin: 'auto', backgroundColor: "#FCEBDB", borderRadius: '16px'}}
      >
          <Grid container spacing={0} sx={{ alignItems: "center", m: 2}}>
            <Grid item xs={12} sx={{display: 'flex'}}>
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
                  <SearchIcon sx={{display: "flex", alignItems: "center", p: 2, mr: 2}}/>
                ) : (
                  <CloseIcon  sx={{display: "flex", alignItems: "center", p: 2, mr: 2}} id="clearBtn" onClick={clearInput} />
                )}
              </div>
            </Grid>
            <Grid>
            </Grid>
          </Grid>
      </AppBar>
      {/* </div> */}
      <Typography sx={{ my: 5, mx: 10 }} color="#081c15" align="center"> 
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
    </ThemeProvider>
  );
}

export default Content;