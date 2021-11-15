import { ChartData, ScatterDataPoint } from 'chart.js';
import { Line } from 'react-chartjs-2'


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
    <>
      <div className='header'>
        <h1 className='title'>Linechart</h1>
        <div className='links'>
          <a className='btn btn-gh'> github source </a>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;