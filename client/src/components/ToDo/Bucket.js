import React, { useState } from 'react';
import BucketForm from './BucketForm';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {Card} from '@mui/material'
import CssBaseline from '@mui/material';

function ToDoItems(props) {
  // const [edit, setEdit] = useState({
  //   id: null,
  //   value: '',
  //   // eagerness: '',
  // });

  // console.log(props.bucket);

  // const submitUpdate = (value) => {
  //   props.editBucketItem(edit.id, value);
  //   setEdit({ id: null, value: '', eagerness: '' });
  // };

  // if (edit.id) {
  //   return <BucketForm edit={edit} onSubmit={submitUpdate} />;
  // }

  // return props.bucket.map((item, i) => (
    // <Card
    //   className={
    //     item.isComplete
    //       ? `bucket-row complete ${item.eagerness}`
    //       : `bucket-row ${item.eagerness}`
    //   }
    //   key={i}
    // >
    //   <div key={item.id} onClick={() => props.completeBucketItem(item.id)}>
    //     {item.text}
    //   </div>
    //   <div>
    //     {console.log(item)}
    //     <p onClick={() => setEdit({ id: item.id, value: item.text, eagerness: item.eagerness })}><EditIcon/></p>
    //     <p onClick={() => props.removeBucketItem(item.id)}><CloseIcon/> </p>
    //   </div>
    // </Card>
  // ));
}

export default ToDoItems;
