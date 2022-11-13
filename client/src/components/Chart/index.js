import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { QUERY_ME } from '../../utils/queries';
import { RESET_DATA } from '../../utils/mutations';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = () => {
    const { data } = useQuery( QUERY_ME );
    let userData = data?.me || [];

    const [resetData] = useMutation( RESET_DATA );
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
            '#005F73',
            '#CA6702'
            ],
            // data: [50, 50]
            data: [completedTasks, tasksToGo]
          }
        ]
      }
      
      const handleReset = () => {
        try {
            resetData();
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
      };

    return (
        <>
        <Box>
          <h2>Progress</h2>
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
          <div>
            <Button type="submit" variant="contained" color="primary" onClick={handleReset}>Reset</Button>
          </div>
          </Box>
        </>
    );
  };
  
  export default TaskChart;