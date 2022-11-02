import React from 'react';
// import { useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Weather from '../components/Weather/index';
import ToDoList from '../components/ToDoList/index';
import Quote from '../components/Quote/index';
import Chart from '../components/Chart/index';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

// import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
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
              {/* To-Do List Container */}
              <Grid item xs={12} md={4} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <ToDoList />
                </Paper>
              </Grid>
              {/* Positive Affirmation Container */}
              <Grid item xs={12} md={4} lg={8}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                  <Quote />
                </Paper>
              </Grid>
              {/* Chart/History Container */}
              <Grid item xs={12} md={8} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                  <Chart />
                </Paper>
              </Grid>
            </Grid>
          </Container>
  );
};

export default Home;
