import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Alert } from '@mui/material';
// import Seed from '../../Seeds.json';
export default function GutterlessList() {
    // function SeedDisplay(){
    //     const DisplayData=Seed.map(
    //         (info)=>{
    //             return(
    //                 <tr>
    //                     <td>{info.id}</td>
    //                     <td>{info.name}</td>
    //                     <td>{info.city}</td>
    //                 </tr>
    //             )
    //         }
    //     )
    
    function taskEdit() {
        // eslint-disable-next-line no-restricted-globals
         (confirm("Would you like to edit this task?"))
         
    }
  return (
    <List sx={{ width: '450%%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {[1,2,3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment" onClick={taskEdit}>
                Edit task
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Task ${value}`} />
        </ListItem>
      ))}
    </List>
  );
     }

// }
