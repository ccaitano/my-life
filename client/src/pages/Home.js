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

import { autocompleteClasses, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import MobileScreenShareTwoToneIcon from '@mui/icons-material/MobileScreenShareTwoTone';
import { Stack } from '@mui/system';

const landingTheme = createTheme({
  typography: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 14,

    h2: {
      fontSize: 60,
      fontWeight: 'medium',
    },
    h5: {
      fontSize: 25,
      fontWeight: 'medium',
    },
  },
  palette: {
    primary: {
      main: '#424242'
    } ,
  }
}); 

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'black',
  fontWeight: 'medium',
};

const image = {
  height: 30,
  my: 3,
};

const Home = () => {

  return (
    <div>
      <Container maxWidth="lg" background="none" sx={{ mt: 4, mb: 4 }} >      
        {Auth.loggedIn() ? (
          <>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>

              <Paper
                sx={{
                  p: 2,
                  // width: 800,
                  height: 'auto',
                  minHeight: '50vh !important',
                  justifyContent: 'center',
                  backgroundColor: '#FFFBF8',
                  display: 'flex',
                }}
              >
                <ToDoList />
              </Paper>
   
            </Grid>
            <Grid item xs={12} md={4}>
           
              <Stack spacing={2}>
              {/* Positive Affirmation Container */}    
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    backgroundColor: "#FFFBF8",
                    height: 'auto'
                  }}
                >
                  <Quote />
                </Paper>
              {/* Chart/History Container */}
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    backgroundColor: '#FFFBF8',
                    height: 'auto'
                    // width: 301,
                  }}
                >
                  <TaskChart />
                </Paper>
              </Stack>
            
            </Grid>
        </Grid>
        </>) : (
          <ThemeProvider theme={landingTheme}>
            <Paper
            sx={{
              p: 4,
              backgroundColor: '#D6CAD8',
              mt: 2,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {/* <Box 
              sx={{
                backgroundColor: 'hsl(0, 100%, 30%, 0.9)',
                marginTop: 8,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            > */}
              <Typography color="#2C262B" align="center" variant="h2" marked="center">
                Simplify your life with MyLife
              </Typography>
              <Typography
                color="#2C262B"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { sx: 4, sm: 5 } }}
                >
                  Are you struggling with time management and consistency? Forgetting to take your medication everyday? With MyLife, it can help you create a ToDoList with simple reminders in place for the tasks you need to accomplish in a given day, so that you can decrease your stress and increase your productivity.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component="a"
                href="/signup"
                type='submit'
                sx={{ minWidth: 200 }}>
                  REGISTER
              </Button>
              <Container
                sx={{
                  backgroundColor: 'tansparent',
                  mt: 5,
                  mb: 5,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography color="#2C262B" align="center" variant="h2"   marked="center">
                  How it Works
                </Typography>
      <div>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={number}>1.</Box>
            <Box sx={image}>
              <AddBoxTwoToneIcon color="#2C262B" fontSize="large"/>
            </Box>
            <Typography variant="h5" align="center" color="#2C262B">
              Create a new reminder and set a notification time.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={number}>2.</Box>
            <Box sx={image}>
              <BeenhereTwoToneIcon color="#2C262B" fontSize="large"/>
            </Box>
            <Typography variant="h5" align="center" color="#2C262B">
              Approve notification if task has been completed or not.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={number}>3.</Box>
            <Box sx={image}>
              <MobileScreenShareTwoToneIcon color="#2C262B" fontSize="large"/>
            </Box>
            <Typography variant="h5" align="center" color="#2C262B">
              Share your results with friends and review your history log of previous tasks met.
            </Typography>
          </Grid>
        </Grid>
      </div>
      </Container>
      {/* </Box> */}
      </Paper>
      </ThemeProvider>
      )}
    </Container>
 </div> 
  );
};

export default Home;
