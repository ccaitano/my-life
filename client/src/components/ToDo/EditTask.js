// import React from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import CloseIcon from '@mui/icons-material/Close';
// import {Card} from '@mui/material';
// import { QUERY_TASKS } from '../../utils/queries';
// import { REMOVE_TASK } from '../../utils/mutations';
// import { removeTaskId } from '../../utils/localStorage';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
// };
// const TaskList = ({ tasks, title }) => {
//   if (!tasks.length) {
//     return <h3>No Tasks to Display</h3>;
//   }
//   const [removeTask] = useMutation( REMOVE_TASK );

  // const handleDeleteBook = async (taskId) => {
  //   try {
  //     const response = await removeTask({
  //       variables: { taskId: taskId},
  //     });
  //     console.log(response);
  //     removeTaskId(taskId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
//   return (
//     <div>
//       <h3>{title}</h3>
//       {tasks &&
//         tasks.map((task) => (
//           <Card>
//             <div key={task._id} className="card mb-3">
//               <p>{task.taskText}</p>
//                 <span style={{ fontSize: '1rem' }}>
//                   created on {task.createdAt}
//                 </span>
//                 <p onClick={handleDeleteBook}><CloseIcon/> </p>
//             </div>

//           </Card>
//         ))}
//     </div>
    
//   );
// };

// export default TaskList;
