import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import SingleThought from './pages/SingleThought';
// import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';

import './css/index.css'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const mdTheme = createTheme();

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh page">
          <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
              <Header />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  pt: '100px',
                  height: '100vh',
                  overflow: 'auto',
                }}
              >
                <div className="container">
                  <Routes>
                    <Route 
                      path="/"
                      element={<Home />}
                    />
                    <Route 
                      path="/signup" 
                      element={<Signup />}
                    />
                    {/* !!! Add In Different Routes Here !!! */}
                     <Route 
                      path="/login" 
                      element={<Login />}
                    />
                    
                    {/*<Route 
                      path="/me" 
                      element={<Profile />}
                    />
                    <Route 
                      path="/profiles/:username" 
                      element={<Profile />}
                    />
                    <Route 
                      path="/thoughts/:thoughtId" 
                      element={<SingleThought />}
                    /> */}
                  </Routes>
                </div>
                <Footer />
              </Box>
            </Box>
          </ThemeProvider>
        </div>
      </Router>   
    </ApolloProvider>
  );
}

export default App;
