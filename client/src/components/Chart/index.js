import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {Button, Box, Grid} from '@mui/material';
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
              '#AAB9D0',
              '#4B80A8'
            ],
            hoverBackgroundColor: [
            '#FCEBDB',
            '#FFDEA4'
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
        <Box sx={{ flexGrow: 1, backgroundColor: '#BDB2FF', color: 'black', borderRadius: '12px'}}>
          <h1>Progress</h1>
          {totalTasks > 0 ? (
            <>
          <Grid sx={{}}>
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
                width={"30%"}
                sx={{width:'100%'}}
              

            />
          </Grid>
          <div>
            <Button sx={{backgroundColor: "#423240", color:'#D6CAD8', '&:hover': {
      backgroundColor: '#FCEBDB',
      color: '#975D66'}, m:2 }} type="submit" variant="contained" onClick={handleReset}>Reset</Button>
          </div>
          </>
          ) : (
            <h3>No Data to Display</h3>
          )}
          </Box>
        </>
    );
  };
  
  export default TaskChart;