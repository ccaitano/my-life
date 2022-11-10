import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from '../components/Weather/index';
import ToDoList from '../components/ToDo/index';
import Quote from '../components/Quote/index';
import TaskChart from '../components/Chart/index';
import Auth from '../utils/auth';
import Link from '@mui/material/Link';
// import Draggable from 'react-draggable';

import Box from '@mui/material/Box';
import Draggable from 'react-draggable';

import '../css/index.css'

const Home = () => {

  return (
    <div>
    {Auth.loggedIn() ? (
      <>
    <Container maxWidth="lg" background="none" sx={{ mt: 4, mb: 4 }} >
      <Grid container spacing={4}>
        {/* To-Do List Container */}
        <Box>
          {/* <Draggable> */}
            <Grid item xs={12} md={4} lg={8}>
              <Paper
                sx={{
                  p: 2,
                  height: 800,
                  maxWidth: '150%'
                }}
              >
                <ToDoList />
              </Paper>
            </Grid>
          {/* </Draggable> */}
        </Box>
        {/* Chart/History Container */}
        <Box>
          {/* <Draggable>    */}
            <Grid item xs={4} md={6} lg={10}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: 240, 
                  width: 240
                }}
              >
                <TaskChart />
              </Paper>
            </Grid>
          {/* </Draggable> */}
        </Box>
        {/* Weather API Container */}
        {/* <Box> */}
          {/* <Draggable> */}
            {/* <Grid item xs={12} md={8} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Weather />
              </Paper>

            </Grid> */}
          {/* </Draggable> */}
        {/* </Box> */}
        
        {/* Positive Affirmation Container */}
        <Box>
          {/* <Draggable> */}
            <Grid item xs={12} md={4} lg={8}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: 240, 
                }}
              >
                <Quote />
              </Paper>
            </Grid>
          {/* </Draggable> */}
        </Box>
        
      </Grid>
    </Container>
    </>
    ) : (
      <p>
        You need to be logged in to view your dashboard. Please {' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>
    )}
    </div>
  );
};

export default Home;
