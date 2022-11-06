// import React from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import CloseIcon from '@mui/icons-material/Close';
// import {Card} from '@mui/material';
// import { QUERY_TASKS } from '../../utils/queries';
// import { REMOVE_TASK } from '../../utils/mutations';
// import { removeTaskId } from '../../utils/localStorage';

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
