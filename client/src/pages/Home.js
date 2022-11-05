import React from 'react';
// import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from '../components/Weather/index';
import ToDoList from '../components/ToDo/index';
import Quote from '../components/Quote/index';
import Chart from '../components/Chart/index';
import Draggable from 'react-draggable';
import '../css/index.css'
// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

// import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

  return (
    <Container maxWidth="lg" background="none" sx={{ mt: 4, mb: 4 }} >
            <Grid container spacing={4}>


            <box>
                <Draggable>
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
              </Draggable>
              </box>

                <box>
                <Draggable>
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
              </Draggable>
              </box>


              <box>
                <Draggable>
              
              {/* Positive Affirmation Container */}
              <Grid item xs={12} md={4} lg={8}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                  <Quote />
                </Paper>
              </Grid>
              </Draggable>
              </box>

              <box>
                <Draggable>
              {/* Chart/History Container */}
              <Grid item xs={12} md={8} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                  <Chart />
                </Paper>
              </Grid>
              </Draggable>
              </box>
            </Grid>
          </Container>



  );
};

export default Home;
