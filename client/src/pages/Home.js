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
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import MobileScreenShareTwoToneIcon from '@mui/icons-material/MobileScreenShareTwoTone';

const landingTheme = createTheme({
  typography: {
    fontFamily: "'Arsenal', sans-serif",
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
          <ThemeProvider theme={landingTheme}>
            
          <Container
            sx={{
              bgcolor: 'text.disabled',
              mt: 10,
              mb: 15,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography color="#bdbdbd" align="center" variant="h2" marked="center">
              Simplify your life with MyLife
            </Typography>
              <Typography
                color="#bdbdbd"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
                >
                Are you struggling with time management and consistency? Forgetting to take your medication everyday? With MyLife, it can help you create a ToDoList with simple reminders in place for the tasks you need to accomplish in a given day, so that you can decrease your stress and increase your productivity.
              
              </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  component="a"
                  href="/signup"
                  sx={{ minWidth: 200 }}>

                  Register

                </Button>
              <Container
                sx={{
                  bgcolor: '#eeeeee',
                  mt: 10,
                  mb: 15,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
          <Typography color="inherit" align="center" variant="h2"     marked="center">
              How it Works
          </Typography>
        <div>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          
          <Box sx={number}>1.</Box>
            <Box sx={image}>
              <AddBoxTwoToneIcon color="primary" fontSize="large"/>
            </Box>
              <Typography variant="h5" align="center">
              Create a new reminder and set a notification time.
              </Typography>
      
        </Grid>
        <Grid item xs={12} md={4}>
         
            <Box sx={number}>2.</Box>
              <Box sx={image}>
                <BeenhereTwoToneIcon color="primary" fontSize="large"/>
              </Box>
                <Typography variant="h5" align="center">
                  Approve notification if task has been completed or not.
                </Typography>
          
        </Grid>
        <Grid item xs={12} md={4}>
          
            <Box sx={number}>3.</Box>
              <Box sx={image}>
                  <MobileScreenShareTwoToneIcon color="primary" fontSize="large"/>
              </Box>
                <Typography variant="h5" align="center">
                  Share your results with friends and review your history log of previous tasks met.
                </Typography>
         
        </Grid>
      </Grid>
    </div>
        </Container>
        </Container>
      </ThemeProvider>
        )}
    </Container>
 </div> 
  );
};

export default Home;
