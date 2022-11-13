import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import ListItem from '@mui/material/ListItem';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MainListItems from './listItems';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from '@mui/material/Link';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Button from '@mui/material/Button';
import Auth from '../../utils/auth';
import { Icon } from '@mui/material';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_TASKS, QUERY_ME } from '../../utils/queries';
import MagicBell, { FloatingNotificationInbox, NotificationList, useNotifications, PushNotificationsSubscriber } from '@magicbell/magicbell-react';

function Header () {
  const { data } = useQuery( QUERY_ME );
  let userData = data?.me || null;
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const rightLink = {
      fontSize: 16,
      color: 'common.white',
      ml: 3,
    };

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
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  href="/login"
                  sx={rightLink}
                >
                  {'Sign In'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  href="/signup"
                  sx={rightLink}
                >
                  {'Sign Up'}
                </Link>
              </Box>
              )}
      </Toolbar>
    </AppBar>
  );
}
export default Header;
// const drawerWidth = 240;
// const rightLink = {
//   fontSize: 16,
//   color: 'common.white',
//   ml: 3,
// };
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,

//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// function Header() {
//   // const [state, setState] = React.useState({
//   //   // top: false,
//   //   left: false,
//   //   // bottom: false,
//   //   // right: false,
//   // });

//   // const toggleDrawer = (anchor, open) => (event) => {
//   //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//   //     return;
//   //   }

//   //   setState({ ...state, [anchor]: open });
//   // };

//   // const list = (anchor) => (
//   //   <Box
//   //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//   //     role="presentation"
//   //     onClick={toggleDrawer(anchor, false)}
//   //     onKeyDown={toggleDrawer(anchor, false)}
//   //   >
//       {/* <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List> */}
//     //    <ListItemButton component={Link} to='/login'>
//     //   <ListItemIcon>
//     //     <DashboardIcon />
//     //   </ListItemIcon>
//     //   <ListItemText primary="Log In" />
//     // </ListItemButton>
//     // <ListItemButton component={Link} to='/HomeReturn'>
//     //   <ListItemIcon>
//     //     <DashboardIcon />
//     //   </ListItemIcon>
//     //   <ListItemText primary="Homepage" />
//     // </ListItemButton>
//     // <ListItemButton component={Link} to='/UserPage'>
//     //   <ListItemIcon>
//     //     <PeopleIcon />
//     //   </ListItemIcon>
//     //   <ListItemText primary="Manage Friends!" />
//     // </ListItemButton>
//     // <ListItemButton>
//     //   <ListItemIcon>
//     //     <BarChartIcon />
//     //   </ListItemIcon>
//     //   <ListItemText primary="Progress" />
//     // </ListItemButton>
//       // {/* <Divider />
//       // <List>
//       //   {['All mail', 'Trash', 'Spam'].map((text, index) => (
//       //     <ListItem key={text} disablePadding>
//       //       <ListItemButton>
//       //         <ListItemIcon>
//       //           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//       //         </ListItemIcon>
//       //         <ListItemText primary={text} />
//       //       </ListItemButton>
//       //     </ListItem>
//       //   ))}
//       // </List> */}
//   //   </Box>
//   // );
//   // const [open, setOpen] = React.useState(false);
//   // const toggleDrawer = () => {
//   //   setOpen(!open);
//   // };
//   // const [auth, setAuth] = React.useState(true);
//   // const [anchorEl, setAnchorEl] = React.useState(null);

//   // const handleChange = (event) => {
//   //   setAuth(event.target.checked);
//   // };

//   // const handleMenu = (event) => {
//   //   setAnchorEl(event.currentTarget);
//   // };

//   // const handleClose = () => {
//   //   setAnchorEl(null);
//   // };
//   // const logout = (event) => {
//   //   event.preventDefault();
//   //   Auth.logout();
//   // };

//   // return (
//   //   <>
//   //     <CssBaseline />
//   //     {/* Top Header Nav Bar and Icons */}
//   //     {/* <StyledRoot> */}
//   //     <AppBar position="fixed" style={{ color: 'black', background: '	rgb(211,211,211, 0.2)'}} >
//   //       <Toolbar
//   //           sx={{
//   //             pr: '24px', // keep right padding when drawer closed
//   //           }}
//   //         >
//   //           {Auth.loggedIn() ? (
//   //               <>
//   //                 <IconButton
//   //                   edge="start"
//   //                   color="inherit"
//   //                   aria-label="open drawer"
//   //                   onClick={toggleDrawer}
//   //                   // sx={{
//   //                   //   marginRight: '36px',
//   //                   //   ...(open && { display: 'none' }),
//   //                   // }}
//   //                 >
//   //                   <MenuIcon />
//   //                 </IconButton>
//   //               </>) : ('')}
//   //           <Typography
//   //             component="h1"
//   //             variant="h4"
//   //             color="inherit"
//   //             noWrap
//   //             sx={{ flexGrow: 10 }}
//   //           >
//   //             MyLife
//   //           </Typography>
//   //           {Auth.loggedIn() ? (
//   //               <>
//   //           <IconButton color="inherit">
//   //             <Badge badgeContent={4} color="secondary">
//   //               <NotificationsIcon />
//   //             </Badge>
//   //           </IconButton>
//   //           <IconButton
//   //               size="large"
//   //               aria-label="account of current user"
//   //               aria-controls="menu-appbar"
//   //               aria-haspopup="true"
//   //               onClick={handleMenu}
//   //               color="inherit"
//   //             >
//   //               <AccountCircle />
//   //             </IconButton>
//   //             <Menu
//   //               id="menu-appbar"
//   //               anchorEl={anchorEl}
//   //               anchorOrigin={{
//   //                 vertical: 'top',
//   //                 horizontal: 'right',
//   //               }}
//   //               keepMounted
//   //               transformOrigin={{
//   //                 vertical: 'top',
//   //                 horizontal: 'right',
//   //               }}
//   //               open={Boolean(anchorEl)}
//   //               onClose={handleClose}
//   //             >
//   //               <MenuItem onClick={handleClose}>Profile</MenuItem>
//   //               <MenuItem onClick={handleClose}>My account</MenuItem>
//   //             </Menu>
//   //             <IconButton
//   //               size="large"
//   //               aria-label="account of current user"
//   //               aria-controls="menu-appbar"
//   //               aria-haspopup="true"
//   //               onClick={logout}
//   //               color="inherit"
//   //             >
//   //               <LogoutIcon />
//   //             </IconButton>
//   //             </>) : (
//   //               <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
//   //               <Link
//   //                 color="inherit"
//   //                 variant="h6"
//   //                 underline="none"
//   //                 href="/login"
//   //                 sx={rightLink}
//   //               >
//   //                 {'Sign In'}
//   //               </Link>
//   //               <Link
//   //                 variant="h6"
//   //                 underline="none"
//   //                 href="/signup"
//   //                 sx={rightLink}
//   //               >
//   //                 {'Sign Up'}
//   //               </Link>
//   //             </Box>
//   //             )}
//   //       </Toolbar>
//   //     </AppBar>

//   //     {/* Drawer Menu on Left Hand Side of Page */}
//   //     <div>
//   //     {['left'].map((anchor) => (
//   //       <React.Fragment key={anchor}>
//   //         <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//   //         <Drawer
//   //           anchor={anchor}
//   //           open={state[anchor]}
//   //           onClose={toggleDrawer(anchor, false)}
//   //         >
//   //           {list(anchor)}
//   //         </Drawer>
//   //       </React.Fragment>
//   //     ))}
//   //   </div>
//   //     {/* <Drawer sx={{width: drawerWidth, flexShrink:0, '& .MuiDrawer-paper': {
//   //           width: drawerWidth,
//   //           boxSizing: 'border-box',
//   //         },
//   //       }} anchor="left" variant="persistent" open={open}>
//   //       {/* <Toolbar
//   //         sx={{
//   //           display: 'flex',
//   //           alignItems: 'center',
//   //           justifyContent: 'flex-end',
//   //           px: [1],
//   //         }}
//   //       > */}
//   //       {/* <DrawerHeader>
//   //         <IconButton onClick={toggleDrawer}>
//   //           {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//   //         </IconButton>
//   //       </DrawerHeader>
//   //       <Divider />
//   //       <List component="nav">
//   //         {mainListItems}
//   //       </List>
//   //     </Drawer> */} 
//   //     {/* </StyledRoot> */}
//   //   </>
//   // );
// }

// export default Header;


