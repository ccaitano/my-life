import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Card } from '@mui/material';
import { Button, FormControl, TextField} from '@mui/material';
import { QUERY_TASKS, QUERY_ME } from '../../utils/queries';
import { ADD_TASK, REMOVE_TASK, EDIT_TASK, COUNT_TOTAL, COUNT_COMPLETED, MARK_COMPLETED, COUNT_DELETE } from '../../utils/mutations';
import './App.css'
import MagicBell, { FloatingNotificationInbox, NotificationList, useNotifications, PushNotificationsSubscriber } from '@magicbell/magicbell-react';

const ToDoList = () => {

    // Declare queries and mutations
    const { data } = useQuery( QUERY_ME );
    let tasks = data?.me.tasks || null;
    let userData = data?.me || null;
    const [removeTask] = useMutation( REMOVE_TASK );
    const [editTask] = useMutation( EDIT_TASK );
    const [countTotalTask] = useMutation( COUNT_TOTAL );
    const [countCompletedTask] = useMutation( COUNT_COMPLETED );
    const [markCompletedTask] = useMutation( MARK_COMPLETED );
    const [countDeleteTask] = useMutation( COUNT_DELETE );
    // const { notifications } = useQuery( GET_NOTIFICATIONS);
    const [addTask] = useMutation( ADD_TASK, {
        update(cache, { data: { addTask }}) {
            try {
                cache.writeQuery({
                    query: QUERY_TASKS,
                    data: { tasks: [addTask, ...tasks]},
                });
            } catch (err) {
                console.error(err);
            }
        },
    });
    console.log(userData);
    // Set states
    const [taskText, setTaskText] = useState('');
    const [editTaskText, setEditTaskText] = useState('');
    const [open, setOpen] = React.useState(false);
    const [editItem, setEditItem] = React.useState(false);
    const [editTaskId, setEditTaskId] = useState('');

    // handleOpen - Opens Pop-Up Dialog Box when Editing Item
    const handleOpen = (task) => {
      setOpen(true);
      setEditItem(true);
      setEditTaskText(task.taskText);
      setEditTaskId(task._id);
    };

    // handleClose - Closes Pop-Up Dialog Box when Editing Item
    const handleClose = () => setOpen(false);
    
    // handleForm Submit - Adds Reminder/Task to List
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          await addTask({
            variables: {
              taskText
            },
          });
          // Adds +1 to totalTask count
          countTotalTask();
          setTaskText('');
          // componentDidMount();
          createNotification(taskText, userData.email);
          // const schedule = require('node-schedule');
          // const rule = new schedule.RecurrenceRule();
          // rule.minute = 27;
          // schedule.scheduleJob(rule, handleNotification(taskText));
          window.location.reload();
          console.log(taskText);
        } catch (err) {
          console.error(err);
        }
      };
      
      // const handleNotification = (taskText) => {
      //   let notification;
      //   // let interval;
      //   Notification.requestPermission().then(perm => {
      //     if(perm === 'granted') {
      //       // document.addEventListener("visibilitychange", ()=>{
      //         // if (document.visibilityState === "hidden") {
      //           // interval = setInterval(() => {
      //             notification = new Notification("MyLife", {
      //               tag: "Status",
      //               // body: "Did you complete your tasks?",
      //               body: taskText,
      //             });
      //           // }, 100);
      //         // } else {
      //         //   // clearInterval(interval);
      //         //   notification.close();
      //         // };
      //       // });
      //     }
      //   });
      // };

    // handleChange - Updates text input when adding reminder/task
    const handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      if (name === 'taskText') {
        setTaskText(value);
      }
    };

    // handleEditChange - Updates text input when editing reminder/task in pop-up dialog box
    const handleEditChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      if (name === 'editTaskText') {
        setEditTaskText(value);
      }
    };

    // handleDeleteTask - Removes task from list
    const handleDeleteTask = async (taskId) => {
      try {
        await removeTask({
          variables: { taskId: taskId },
        });
        // Removes one item from totalTask count
        const thisTask = tasks.find(item => item._id);
        if (thisTask._id === taskId && thisTask.completed === false) {
          countDeleteTask();
        }
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    // handleEditTask - Edits task text and closes pop-up dialog box
    const handleEditTask = async (taskId, taskText) => {
      setEditTaskText(taskText);
      try {
        await editTask({
          variables: { taskId: taskId, taskText: taskText},
        });
      // Close pop-up dialog box         
      handleClose();    
      } catch (err) {
        console.log(err);
      }
    };

    // handleComplete - Adds +1 to completedTask count and marks item as completed
    const handleComplete = async (taskId) => {
      try {
        // Adds to completedTask count
        countCompletedTask();
        await markCompletedTask({
          variables: {taskId: taskId}
        });
        window.location.reload();
        // setCompletedTask(true);
      } catch (err) {
        console.error(err);
      }
    };

const createNotification = (taskText, email) => {
  // Update headers
  const myHeaders = new Headers();
  myHeaders.append('X-MAGICBELL-API-KEY','65dc400d927974791246777c59a0d4cdae7029e0');
  myHeaders.append('X-MAGICBELL-API-SECRET', 'z2Pic7hn4eeN3eKTmn6CBvt/Jj03eHjEK4xVkeZI');
  myHeaders.append('X-MAGICBELL-USER-EMAIL', userData.email);
  console.log(myHeaders.values);
  // Set Up Admin Data for MagicBell
  fetch('https://api.magicbell.com/notifications', {
    headers: {
      'X-MAGICBELL-API-KEY': '65dc400d927974791246777c59a0d4cdae7029e0',
      'X-MAGICBELL-API-SECRET': 'z2Pic7hn4eeN3eKTmn6CBvt/Jj03eHjEK4xVkeZI',
      'X-MAGICBELL-USER-EMAIL': userData.email
    },
  }).then(response => {
      console.log(response.headers);
  });

  // Create Actual Notification
  fetch('https://api.magicbell.com/notifications', {
    method: 'POST',
    headers: {
      'X-MAGICBELL-API-KEY': '391b3143b9e12d49446b88586c9a7c7261aa4c7a',
      'X-MAGICBELL-API-SECRET': 'z2Pic7hn4eeN3eKTmn6CBvt/Jj03eHjEK4xVkeZI',
    },
    body: JSON.stringify({
      notification: {
        title: "New Task Added",
        content: taskText,
        recipients: [{
          email: email
        }]
      }
    })
  });
}
    const stores = [
      { id: 'default', defaultQueryParams: { read: false } },
      { id: 'read', defaultQueryParams: { read: true } },
    ];

    const tabs = [
      { storeId: 'default', label: 'Latest' },
      { storeId: 'read', label: 'Archive' },
    ];

    return (
        <div>
          <h1>Reminders</h1>
            <Grid>
            {userData ? (
              <MagicBell
              apiKey="391b3143b9e12d49446b88586c9a7c7261aa4c7a"
              userEmail={userData.email}
              stores={stores}
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
            {/* <PushNotificationsSubscriber serviceWorkerPath="/service-worker.js">
              {({ createSubscription }) => (
                <button onClick={registerSubscription}>Enable push notifications</button>
              )}
            </PushNotificationsSubscriber> */}
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
                    {/* Following Block of Code is if we add in priority... */}
                  <Button type="submit" variant="contained" color="primary"  >Add Reminder</Button>
                </FormControl>
              </form>
              <h3>Current Tasks...</h3>
              <div id="taskList">
                {tasks?.map((task) => (
                  <Card key={task._id} className="card mb-3">
                    {task.completed ? <p style={{textDecoration: 'line-through'}}>{task.taskText}</p> : <p style={{textDecoration: 'none'}}>{task.taskText}</p>}
                    {/* Edit Icon to Edit Existing Reminder/Task */}
                    <p onClick={() => handleOpen(task)}><EditIcon/></p>
                    {editItem ? (
                      <Dialog open={open} onClose={handleClose}>
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
                    {/* Delete Existing Item Button */}
                    <p onClick={() => handleDeleteTask(task._id)}><CloseIcon/> </p>
                    {/* Mark Existing Item as Completed */}
                    <p onClick={() => handleComplete(task._id)}><CheckCircleIcon/> </p>
                  </Card>
                ))}
               
              </div>
            </Grid>
        </div>
    );
  };
  
  export default ToDoList;

