import React from 'react';

const TaskList = ({ tasks, title }) => {
  if (!tasks.length) {
    return <h3>No Tasks to Display</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {tasks &&
        tasks.map((task) => (
          <div key={task._id} className="card mb-3">
            <p>{task.taskText}</p>
              <span style={{ fontSize: '1rem' }}>
                created on {task.createdAt}
              </span>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
