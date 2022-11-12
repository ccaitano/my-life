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
import '../css/index.css'
import { autocompleteClasses, Typography } from '@mui/material';

const Home = () => {

  return (
    <div>
    <Container maxWidth="lg" background="none" sx={{ mt: 4, mb: 4 }} >      
      {Auth.loggedIn() ? (
                <>
        <Grid container spacing={4}>
          {/* Weather API Container */}
          {/* <Box> */}
            {/* <Draggable> */}
              {/* <Grid item xs={12} md={8} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    m: 2,
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
          {/* To-Do List Container */}
          {/* <Box> */}
            {/* <Draggable> */}
            <Box>
              <Grid item xs={12} md={4} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    width: 800,
                    height: 800,
                    justifyContent: 'center',
                    backgroundColor: '344955',
                    display: 'flex',
                    // p: 0,
                    // width: '100%',
                    // height: '100%'
                  }}
                >
                  <ToDoList />
                </Paper>
              </Grid>
            </Box>
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
