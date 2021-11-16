import { ChartData, ScatterDataPoint } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';


const data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> = {
  labels: ['1', '2', '3', '4', '5', '6'], 
  datasets: [
    { 
      label: '# of votes', 
      data: [12, 19, 3, 5, 2, 3], 
      fill: false, 
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)'
    },
  ],
};

const options = {
  scales: {
    y: { beginAtZero: true}
  },
}

const LineChart = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2} />
        <Grid item xs={6}> 
          <Line data={data} options={options} />
          <Line data={data} options={options} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LineChart;