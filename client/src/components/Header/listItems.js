import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';

function MainListItems() {
  return (
      <List >
        {/* <ListItem key='login' disablePadding>
          <ListItemButton component={Link} to='/login'>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Log In" />
          </ListItemButton>
        </ListItem> */}
        <ListItem key='home' disablePadding sx={{color:'#423240'}}>
          <ListItemButton component={Link} to='/HomeReturn'>
            <ListItemIcon>
              <HomeIcon sx={{color:'#423240'}}/>
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>
        <ListItem key='user' disablePadding sx={{color:'#423240'}}>
          <ListItemButton component={Link} to='/UserPage'>
            <ListItemIcon>
              <PeopleIcon sx={{color:'#423240'}}/>
            </ListItemIcon>
            <ListItemText primary="Manage Friends!"/>
          </ListItemButton>
        </ListItem>
        <ListItem key='settings' disablePadding sx={{color:'#423240'}}>
          <ListItemButton>
            <ListItemIcon>
              <BarChartIcon sx={{color:'#423240'}}/>
            </ListItemIcon>
            <ListItemText primary="Progress" />
          </ListItemButton>
        </ListItem>
    </List>  
);
}

export default MainListItems;
