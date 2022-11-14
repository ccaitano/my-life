import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth from '../utils/auth';

const signUpTheme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#424242'
    } ,
  }
});

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    password: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      console.log(formState);
    } catch (e) {
      setShowAlert(true);
      alert('Error: Please Try Again');
      console.error(e);
    };

    setFormState({
      firstName: '',
      lastName: '',
      location: '',
      email: '',
      password: '',
    });

  };

  return (
    <main>
      <ThemeProvider theme={signUpTheme}>
    <Box
          sx={{
            marginTop: 8,
            ml: 2,
            mr: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
          }}
      >
      <Paper elevation={3} sx={{  borderRadius: '12px', backgroundColor: '#D6CAD8'}} >
        <Box sx={{ p: 3}}> 
          <Typography component="h1" variant="h5" fontFamily="'Arsenal', sans-serif;">
            SIGN UP
          </Typography>
          <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              // sx={{ mt: 3, mb: 2 }}
              sx={{ width: '100%', backgroundColor: "#423240", color:'#D6CAD8', '&:hover': {
                backgroundColor: '#FCEBDB',
                color: '#975D66'}, mt: 3, mb: 2}} 
              fontFamily="'Arsenal', sans-serif"
            >
              SUBMIT
            </Button>
            <Grid container justifyContent="center" >
              <Grid item xs={12}>
                <Link href="/login" variant="body2" fontFamily="'Arsenal', sans-serif">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
          
    </Box>
        </ThemeProvider>
        </main>
  );
};

export default Signup;
