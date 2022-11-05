import React from 'react';
import './App.css'
import BucketList from './BucketList';

const ToDoList = () => {

    return (
        <div
        style={{
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center"
        }}
        
        >
            {/* Code goes here! */}
            <BucketList/>
        </div>
    );
  };
  
  export default ToDoList;

