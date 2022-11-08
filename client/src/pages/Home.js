import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from '../components/Weather/index';
import ToDoList from '../components/ToDo/index';
import Quote from '../components/Quote/index';
import Chart from '../components/Chart/index';

// import Draggable from 'react-draggable';

import Box from '@mui/material/Box';
import Draggable from 'react-draggable';

import '../css/index.css'

const Home = () => {

  return (
    <Container maxWidth="lg" background="none" sx={{ mt: 4, mb: 4 }} >

            <Grid container spacing={4}>


            <box>
                {/* <Draggable> */}
              {/* Weather API Container */}
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
              </box>

                <box>
                {/* <Draggable> */}
              {/* To-Do List Container */}
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
              </box>


              <box>
                {/* <Draggable> */}
              
              {/* Positive Affirmation Container */}
              <Grid item xs={12} md={4} lg={8}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                  <Quote />
                </Paper>
              </Grid>
              {/* </Draggable> */}
              </box>

              <box>
                {/* <Draggable> */}
              {/* Chart/History Container */}
              <Grid item xs={12} md={8} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                  <Chart />
                </Paper>
              </Grid>
              {/* </Draggable> */}
              </box>

      <Grid container spacing={4}>
        {/* Weather API Container */}
        <Box>
          <Draggable>
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
          </Draggable>
        </Box>
        {/* To-Do List Container */}
        <Box>
          <Draggable>
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
          </Draggable>
        </Box>
        {/* Positive Affirmation Container */}
        <Box>
          <Draggable>
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
          </Draggable>
        </Box>
        {/* Chart/History Container */}
        <Box>
          <Draggable>   
            <Grid item xs={12} md={8} lg={4}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: 240, 
                }}
              >
                <Chart />
              </Paper>
            </Grid>
          </Draggable>
        </Box>
      </Grid>
    </Container>
  );
};

export default Home;
