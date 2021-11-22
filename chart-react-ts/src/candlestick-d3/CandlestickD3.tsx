import React, { useState } from 'react';
import * as d3 from 'd3';
import classNames from 'classnames';
import "./styles.css";


interface StockUnit {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

interface CandleProp {
  data: StockUnit;
  x: number;
  candleWidth: number, 
  pixelFor: Function;
};

interface ChartDims {
  pixelWidth: number;
  pixelHeight: number;
  dollarHigh: number;
  dollarLow: number;
  dollarDelta: number;
};

interface CrosshairProp {
  x: number;
  y: number;
  chartDims: ChartDims;
};

interface ChartProp {
  data: StockUnit[], 
  chartWidth: number;
  chartHeight: number;
};

const randomOne = (weight = 1) => {
  return (Math.random() + Math.random() - 1) * weight;
};

const generateData = (): StockUnit[] => {
  const length = Math.round(Math.random() * 90) + 10;

  const seed_close = Math.random() * 150 + 50;
  let previous_close = seed_close;
  let previous_volume = Math.random() * 300 + 10;
  let trend = Math.floor(Math.random() * 2) * 2 - 1;

  return d3.range(length).map((item: number, i: number) => {
    const open = previous_close * (1 + randomOne(0.1));
    const close = open * (1 + randomOne(0.2) * trend);
    const high = Math.max(open, close) * (1 + randomOne(0.1));
    const low = Math.min(open, close) * (1 - randomOne(0.1));
    const volume = previous_volume * (1 + randomOne(0.5));

    previous_close = close;
    trend = Math.floor(Math.random() * 2) * 2 - 1;

    return {
      time: i,
      open,
      high,
      low,
      close,
      volume
    };
  });
};

const Crosshair = (props: CrosshairProp): JSX.Element => {
  const { x, y, chartDims } = props;

  if(x+y === 0) return (<></>);

  return (
    <>
      <line x1={0} y1={y} x2={chartDims.pixelWidth} y2={y} 
        className={classNames({ crosshair: true, horz: true })} />
      <line x1={x} y1={0} x2={x} y2={chartDims.pixelHeight} 
        className={classNames({ crosshair: true, vert: true })} />
    </>
  );
};

const Candle = (props: CandleProp): JSX.Element => {
  const { data, x, candleWidth, pixelFor } = props;

  const up = data.close > data.open;
  const barTop = pixelFor(up ? data.close : data.open );
  const barBottom = pixelFor(up ? data.open : data.close );
  const barHeight = barBottom - barTop;
  const wickTop = pixelFor(data.high);
  const wickBottom = pixelFor(data.low);

  return (
    <>
      <rect x={x -candleWidth / 2 } y={barTop} width={candleWidth} 
        height={barHeight} 
        className={classNames({ candle: true, up: up, down: !up })} />
      <line x1={x} y1={barTop} x2={x} y2={wickTop} 
        className={classNames({ wick: true, top: true, up: up, down: !up })} />
      <line x1={x} y1={barBottom} x2={x} y2={wickBottom} 
        className={classNames({ wick: true, bottom: true, up: up, down: !up })} />
    </>
  );
};

const Chart = (props: ChartProp): JSX.Element => {
  const { data, chartWidth, chartHeight } = props;

  const [mousePos, setMousePos] = useState({
    x: 0, y: 0
  });

  const dollarHigh = d3.max(data.map(bar => bar.high))! * 1.05;
  const dollarLow = d3.min(data.map(bar => bar.low))! * 0.95;
  const chartDims: ChartDims = {
    pixelWidth: chartWidth, 
    pixelHeight: chartHeight, 
    dollarHigh: dollarHigh, 
    dollarLow: dollarLow, 
    dollarDelta: dollarHigh - dollarLow
  };

  const dollarAt = (pixel: number): string => {
    const dollar = (Math.abs(pixel - chartDims.pixelHeight) / 
      chartDims.pixelHeight) * chartDims.dollarDelta + chartDims.dollarLow;

    return pixel > 0 ? dollar.toFixed(2) : '-';
  };

  const pixelFor = (dollar: number): number => {
    return Math.abs(
      ( ((dollar - chartDims.dollarLow) / chartDims.dollarDelta) * 
        chartDims.pixelHeight) - chartDims.pixelHeight
    );
  };

  const onMouseLeave = () => { setMousePos({ x: 0, y: 0}); };
  const onMouseInside = (e: any) => {
    setMousePos({
      x: e.nativeEvent.x - Math.round(e.currentTarget.getBoundingClientRect.left), 
      y: e.nativeEvent.y - Math.round(e.currentTarget.getBoundingClientRect.top), 
    });
  };

  const candleWidth = Math.floor((chartWidth / data.length) * 0.7);

  return (
    <svg width={chartWidth} height={chartHeight} className="chart" 
      onMouseMove={onMouseInside} onMouseLeave={onMouseLeave}>
    { data.map((bar: StockUnit, index: number) => {
      const candleX = (chartWidth / (data.length+1) * (index+1));
      return (
        <Candle key={index} data={bar} x={candleX} candleWidth={candleWidth} 
          pixelFor={pixelFor} />
      );
    }) }
    <text x="10" y="16" fill="white" fontSize="10">
      <tspan>
        Mouse: {mousePos.x}, {mousePos.y}
      </tspan>
      <tspan x="10" y="30">
        Dollars: ${dollarAt(mousePos.y)}
      </tspan>
    </text>
    <Crosshair x={mousePos.x} y={mousePos.y} chartDims={chartDims} />
    </svg>
  );
};


const CandlestickChartD3 = (): JSX.Element => {
  const chartWidth = 500;
  const chartHeight = 300;

  const [data, setData] = useState(generateData());

  return (
    <div>
      <div className="content">
        <Chart data={data} chartWidth={chartWidth} chartHeight={chartHeight} />
      </div>
    </div>
  );
};

export default CandlestickChartD3;