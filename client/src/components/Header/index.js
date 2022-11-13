import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MainListItems from './listItems';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

function Header () {
  const { data } = useQuery( QUERY_ME );
  let userData = data?.me || null;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });

  // Toggles Drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Drop Down Menu for Profile Avatar
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
    
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  // MagicBell Inbox Options
  const stores = [
    { id: 'default', defaultQueryParams: { read: false } },
    { id: 'read', defaultQueryParams: { read: true } },
  ];
  
  const tabs = [
    { storeId: 'default', label: 'Latest' },
    { storeId: 'read', label: 'Archive' },
  ];

  return (
    <AppBar position='fixed' style={{ color: 'black', background: '	rgb(211,211,211, 0.2)'}}>
      <Toolbar>
        <IconButton>
          {Auth.loggedIn() ? (
            <div>
              <MenuIcon onClick={toggleDrawer('left', true)} />
              <Drawer
                anchor='left'
                open={state['left']}
                onClose={toggleDrawer('left', false)}
              >
                <Box
                  sx={{ width: 250 }}
                  // role="presentation"
                  onClick={toggleDrawer('left', false)}
                >
                  <MainListItems />
                </Box>
              </Drawer>
            </div>
          ) : (null)};
        </IconButton>
        <Typography variant='h4' component='div' fontFamily="'Arsenal', sans-serif;" style={{ color: 'white', paddingLeft: 20}}>
          MyLife
        </Typography>
        {Auth.loggedIn() ? (
          <>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                {userData ? (
                  <MagicBell
                  apiKey="391b3143b9e12d49446b88586c9a7c7261aa4c7a"
                  userEmail={userData.email}
                  stores={stores}
                  theme={{
                    icon: { borderColor: 'black'}
                  }}
                  >
                    {(props) => (
                      <FloatingNotificationInbox
                        height={350}
                        placement="bottom-start"
                        tabs={tabs}
                        closeOnNotificationClick={false}
                        closeOnClickOutside={true}
                        {...props}
                      />
                    )}
                  </MagicBell>
                ) : null}
              </Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>My Account</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                  </MenuItem>       
                </Menu>
              </Box>
          </>) : (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended" href='/login'>
                  <LoginIcon sx={{ mr: 1 }} />
                    Sign In
                </Fab>
                <Fab variant="extended" href='/signup'>
                  <EditIcon sx={{ mr: 1 }} />
                    Sign Up
                </Fab>
              </Box>
            </Box>
          )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;