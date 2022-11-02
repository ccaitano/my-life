import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
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
  return (
    <List sx={{ width: '450%%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {[1,2,3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
  );
     }

// }
