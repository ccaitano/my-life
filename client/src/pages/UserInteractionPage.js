import React from 'react';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import {useQuery} from '@apollo/react-hooks';
import {QUERY_USERS} from '../utils/queries';
// import style from '../css/Style.css';
// import Select from 'react-select';

const Content = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const {data} = useQuery(QUERY_USERS); 
  let users = data?.users ||[];
  console.log(users);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    let userEmail = users.map(function (value){
      return value.email;
    });
    console.log(userEmail); 


    const newFilter = userEmail.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });
    console.log(newFilter);

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
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              {/* <SearchIcon color="inherit" sx={{ display: 'block' }} /> */}
            </Grid>
            <Grid item xs>
              {/* <Select
              options={wordEntered}
              /> */}
              <TextField
                fullWidth
                placeholder="Search by Username"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                // style
                variant="standard"
                value={wordEntered}
                onChange={handleFilter}
              />
              <div>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Search for user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
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
              <a className="dataItem" href={value}>
                <p>{value}</p>
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