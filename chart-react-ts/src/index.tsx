import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CandlestickD3 from './candlestick-d3/CandlestickD3';


ReactDOM.render(
  <React.StrictMode>
    <CandlestickD3 />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

