import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from '../components/Weather/index';
import ToDoList from '../components/ToDo/index';
import Quote from '../components/Quote/index';
import TaskChart from '../components/Chart/index';
import Auth from '../utils/auth';
// import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import '../css/index.css'
import { Typography } from '@mui/material';

const Home = () => {

  return (
    <div>
    <Container maxWidth="lg" background="none" sx={{ mt: 4, mb: 4 }} >      
      {Auth.loggedIn() ? (
                <>
        <Grid container spacing={4}>
          {/* Weather API Container */}
          <Box>
            {/* <Draggable> */}
              <Grid item xs={12} md={8} lg={4}>
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

              </Grid>
            {/* </Draggable> */}
          </Box>
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
          {/* Chart/History Container */}
          <Box>
            {/* <Draggable>    */}
              <Grid item xs={12} md={8} lg={4}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: 240, 
                    width: 301,
                  }}
                >
                  <TaskChart />
                </Paper>
              </Grid>
            {/* </Draggable> */}
          </Box>
        </Grid>
        </>) : (
          <Typography>My Life Testing Landing Page</Typography>
        )}
    </Container>
 </div> 
  );
};

export default Home;
