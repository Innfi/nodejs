import * as React from 'react';
import { Slider, Typography } from '@mui/material';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { type AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import useId from '@mui/utils/useId';
import alphabetStock from '../dataset/GOOGL.json';

const series = [
  {
    type: 'bar',
    yAxisId: 'volume',
    label: 'Volume',
    color: 'lightgray',
    data: alphabetStock.map((day) => day.volume),
    highlightScope: { highlight: 'item' },
  },
  {
    type: 'line',
    yAxisId: 'price',
    color: 'red',
    label: 'Low',
    data: alphabetStock.map((day) => day.low),
    highlightScope: { highlight: 'item' },
  },
  {
    type: 'line',
    yAxisId: 'price',
    color: 'green',
    label: 'High',
    data: alphabetStock.map((day) => day.high),
  },
] as AllSeriesType[];

const minDistance = 10;

export function CombinedChart() {
  const [xLimits, setXLimits] = React.useState<number[]>([0, alphabetStock.length-1]);
  
  const id = useId();
  const clipPathId = `${id}-clip-path`;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    console.log(`newValue[0]: ${newValue[0]}`);
    console.log(`newValue[1]: ${newValue[1]}`);
    console.log(`activeThumb: ${activeThumb}`);

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setXLimits([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setXLimits([clamped - minDistance, clamped]);
      }
    } else {
      setXLimits(newValue as number[]);
    }
  };


  return (
    <div style={{ width: '100%'}}>
      <Typography>google stocks</Typography>
      <Slider value={xLimits} onChange={handleChange} valueLabelDisplay="auto" min={0} max={alphabetStock.length-1}/>
      <div>
        <ChartContainer series={series} height={400}
          xAxis={[
            {
              id: 'date', 
              data: alphabetStock.map((day) => new Date(day.date)),
              scaleType: 'band',
              valueFormatter: (value) => value.toLocaleDateString(),
              height: 40,
              min: new Date(alphabetStock[xLimits[0]].date),
              max: new Date(alphabetStock[xLimits[1]].date),
            }
          ]}
          yAxis={[
            { id: 'price', scaleType: 'linear', position: 'left', width: 50 },
            {
              id: 'volume',
              scaleType: 'linear',
              position: 'right',
              valueFormatter: (value) => `${(value / 1000000).toLocaleString()}M`,
              width: 55,
            }
          ]}
        >
          <g clipPath={`url(#${clipPathId})`}>
            <ChartsAxisHighlight x="line" />
            <BarPlot />
            <LinePlot />
          </g>
          <LineHighlightPlot />
          <ChartsXAxis
            label="Date"
            axisId="date"
            tickInterval={(value, index) => {
              return index % 30 === 0;
            }}
            tickLabelStyle={{
              fontSize: 10,
            }}
            />
            <ChartsYAxis
              label="Price (USD)"
              axisId="price"
              tickLabelStyle={{ fontSize: 10 }}
            />
            <ChartsYAxis
              label="Volume"
              axisId="volume"
              tickLabelStyle={{ fontSize: 10 }}
            />
          <ChartsTooltip />
        </ChartContainer>
      </div>
    </div>
  );
}