import React, { useState } from 'react';
import d3 from 'd3';


interface StockUnit {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
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

interface CandleProp {
  data: StockUnit;
  x: number;
  candleWidth: number, 
  pixelFor: Function;
};

const Candle = (props: CandleProp) => {
  const { data, x, candleWidth, pixelFor } = props;

  const up = data.close > data.open;

  return (
    <>
      
    </>
  );
};