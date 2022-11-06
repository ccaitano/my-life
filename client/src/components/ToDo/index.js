import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import {Card} from '@mui/material';
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField} from '@mui/material';
import { QUERY_TASKS } from '../../utils/queries';
import { ADD_TASK, REMOVE_TASK, EDIT_TASK } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { saveTaskId, removeTaskId, getSavedTaskIds, saveTaskIds } from '../../utils/localStorage';

import './App.css'
import TaskList from './TaskList';
import BucketList from './BucketList';
import ToDoItems from './Bucket';

const ToDoList = () => {
    const {loading, data} = useQuery( QUERY_TASKS);
    const tasks = data?.tasks || [];
    const [taskText, setTaskText] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [removeTask] = useMutation( REMOVE_TASK );
    const [editTask] = useMutation( EDIT_TASK );
    const [addTask] = useMutation( ADD_TASK, {
        update(cache, { data: { addTask }}) {
            try {
                // const { tasks } = cache.readQuery({ query: QUERY_TASKS});

                cache.writeQuery({
                    query: QUERY_TASKS,
                    data: { tasks: [addTask, ...tasks]},
                });
            } catch (err) {
                console.error(err);
            }
        },
    });

    if (!tasks.length) {
      return <h3>No Tasks Yet!</h3>;
    };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await addTask({
            variables: {
              taskText
            },
          });
          setTaskText('');
          setTaskList( data );
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'taskText') {
          setTaskText(value);
        }
      };

      const handleDeleteTask = async (taskId) => {
        
        try {
          const response = await removeTask({
            variables: { taskId },
          });
          window.location.reload();
          console.log(response);
          // removeTaskId(taskId);
        } catch (err) {
          console.log(err);
        }
      };

      // const handleEditTask = async (taskId) => {
      //   try {
          
      //     const response = await editTask({
      //       variables: { taskId, taskText},
      //     });
      //     setTaskText(taskId.taskText);
      //     console.log(response);
      //     // removeTaskId(taskId);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };

      // setTaskText('');

    return (
        <div
        // style={{
        //     display: "flex", 
        //     flexDirection: "column", 
        //     justifyContent: "center",
        //     alignItems: "center"
        // }}
        
        >
            {/* Code goes here! */}
            {/* <BucketList/> */}
            <h1>Reminders</h1>
            <Grid>
                
                <form onSubmit={handleFormSubmit} >
                    <FormControl>
                    <TextField
                        name="taskText" 
                        label="Write a reminder"
                        type="text"
                        value={taskText}
                        onChange={handleChange}
                        style={{ maxWidth: "25vw", width: "50vw"}}
                        />
                {/* <div className="dropdown">
                    <Button type="submit" variant="contained" color="primary" className={`dropbtn ${eagerness}`}>
                    {eagerness || 'Priority'}
                    </Button>
                    <div className="dropdown-content">
                        <p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
                        <p onClick={() => setEagerness(eagernessLevel[1])}>Want to</p>
                        <p onClick={() => setEagerness(eagernessLevel[2])}>If time</p>
                    </div>
                </div> */}
                {/* <button className="bucket-button">Add Reminder</button> */}
    
                <Button type="submit" variant="contained" color="primary"  >Add Reminder</Button>
            </FormControl>
                </form>
                <h3>Current Tasks...</h3>
                {/* <TaskList tasks={tasks} title="Current Tasks..."/> */}
                <div id="taskList">
                {tasks.map((task) => (
                  <Card key={task._id} className="card mb-3">
                
                      <p>{task.taskText}</p>
                        {/* <span style={{ fontSize: '1rem' }}>
                          created on {task.createdAt}
                        </span> */}
                        {/* <p onClick={() => handleEditTask(task._id, task.taskText)}><EditIcon/></p> */}
                        <p onClick={() => handleDeleteTask(task._id)}><CloseIcon/> </p>

                  </Card>
                
              ))}
              </div>
                <div>
      
      
    </div>
            </Grid>
        </div>
        
    );
  };
  
  export default ToDoList;

