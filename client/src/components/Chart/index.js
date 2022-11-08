import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { QUERY_ME } from '../../utils/queries';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = () => {
    const { data } = useQuery( QUERY_ME );
    let userData = data?.me || [];
    const totalTasks = userData.totalTasks;
    const completedTasks = userData.completedTasks;
    const tasksToGo = totalTasks - completedTasks;
    console.log(completedTasks);
    console.log(totalTasks);
    const state = {
        labels: ['Completed Tasks', 'Tasks To Go'],
        datasets: [
          {
            label: 'Tasks',
            backgroundColor: [
              '#0A9396',
              '#EE9B00'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000'
            ],
            // data: [50, 50]
            data: [completedTasks, tasksToGo]
          }
        ]
      }
    
    return (
        <>
             <h2>Chart of Complete Tasks vs. All Tasks</h2>
            {/* Code goes here! */}
            <div>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Progress',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
        </>
    );
  };
  
  export default TaskChart;