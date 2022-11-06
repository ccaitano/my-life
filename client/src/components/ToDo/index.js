import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Card} from '@mui/material';
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField} from '@mui/material';
import { QUERY_TASKS } from '../../utils/queries';
import { ADD_TASK, REMOVE_TASK, EDIT_TASK, COUNT_TOTAL, COUNT_COMPLETED, MARK_COMPLETED, COUNT_DELETE } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { saveTaskId, removeTaskId, getSavedTaskIds, saveTaskIds } from '../../utils/localStorage';

import './App.css'
// import TaskList from './TaskList';
import BucketList from './BucketList';
import ToDoItems from './Bucket';

const ToDoList = () => {

    const {loading, data} = useQuery( QUERY_TASKS );
    let tasks = data?.tasks || [];
    const [taskText, setTaskText] = useState('');
    const [editTaskText, setEditTaskText] = useState('');
    const [removeTask] = useMutation( REMOVE_TASK );
    const [editTask] = useMutation( EDIT_TASK );
    const [countTotalTask] = useMutation( COUNT_TOTAL );
    const [countCompletedTask] = useMutation( COUNT_COMPLETED );
    const [markCompletedTask] = useMutation( MARK_COMPLETED );
    const [countDeleteTask] = useMutation( COUNT_DELETE );
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

    const [open, setOpen] = React.useState(false);
    const [editItem, setEditItem] = React.useState(false);
    const [editTaskId, setEditTaskId] = useState('');
    const [done, setCompletedTask] = React.useState(false);
    const handleOpen = (task) => {
      setOpen(true);
      setEditItem(true);
      setEditTaskText(task.taskText);
      setEditTaskId(task._id);
    };

    const handleClose = () => setOpen(false);
    // if (!tasks.length) {
    //   return <h3>No Tasks Yet!</h3>;
    // };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await addTask({
            variables: {
              taskText
            },
          });
          countTotalTask();
          setTaskText('');
          console.log(tasks);
        } catch (err) {
          console.error(err);
        }
      };

    const handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      if (name === 'taskText') {
        setTaskText(value);
      }
    };

    const handleEditChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      if (name === 'editTaskText') {
        setEditTaskText(value);
      }
    };

    const handleDeleteTask = async (taskId) => {
      try {
        const response = await removeTask({
          variables: { taskId: taskId },
        });
        countDeleteTask();
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    const handleEditTask = async (taskId, taskText) => {
      setEditTaskText(taskText);
      try {
        const response = await editTask({
          variables: { taskId: taskId, taskText: taskText},
          
        });
                 
      handleClose();    
      } catch (err) {
        console.log(err);
      }
    };
    const handleComplete = async (taskId) => {
      try {
        countCompletedTask();
        await markCompletedTask({
          variables: {taskId: taskId}
        });
        console.log(taskId);
        console.log(tasks);
        window.location.reload();
        // setCompletedTask(true);
      } catch (err) {
        console.error(err);
      }
    };

    return (
        <div
        // style={{
        //     display: "flex", 
        //     flexDirection: "column", 
        //     justifyContent: "center",
        //     alignItems: "center"
        // }}
        >
          <h1>Reminders</h1>
            <Grid>
              <form onSubmit={handleFormSubmit} >
                <FormControl>
                  <TextField
                    name="taskText" 
                    label="Write a reminder"
                    type="text"
                    value={taskText || ""}
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
                    {task.completed ? <p style={{textDecoration: 'line-through'}}>{task.taskText}</p> : <p style={{textDecoration: 'none'}}>{task.taskText}</p>}
                    {/* <span style={{ fontSize: '1rem' }}>
                      created on {task.createdAt}
                      </span> */}
                    <p onClick={() => handleOpen(task)}><EditIcon/></p>
                    {editItem ? (<Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Edit Task</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            id={editTaskId || ""}
                            margin="dense"
                            name="editTaskText"
                            value={editTaskText || ""}
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleEditChange}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => handleEditTask(editTaskId, editTaskText)}>Update</Button>
                          <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>) : null}
                    <p onClick={() => handleDeleteTask(task._id)}><CloseIcon/> </p>
                    <p onClick={() => handleComplete(task._id)}><CheckCircleIcon/> </p>
                  </Card>
                ))};
              </div>
            </Grid>
        </div>
    );
  };
  
  export default ToDoList;

