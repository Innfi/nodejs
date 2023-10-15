import React, { Component } from 'react';
import { ApexOptions } from 'apexcharts'
import ApexChart from 'react-apexcharts';

import { series } from './sample';


const options: ApexOptions = {
  xaxis: { 
    type: 'datetime' 
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
}

const CandlestickChart = () => {

  return (
    <div className="app">
      <ApexChart options={options} series={series} 
        type="candlestick" height={550} width={700} />
    </div>
  );
};

export default CandlestickChart;