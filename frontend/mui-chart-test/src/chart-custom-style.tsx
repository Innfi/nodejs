import * as React from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const labels: string[] = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'];
const lData: number[] = [42, 24, 56, 45, 3];
const rData: number[] = [57, 7, 19, 16, 22];
const colors: string[] = ['#006BD6', '#EC407A'];

export function SxStyling(): React.JSX.Element {1
  return (
    <BarChart
      sx={(theme) => ({
        [`.${barElementClasses.root}`]: {
          fill: (theme.vars || theme).palette.background.paper,
          strokeWidth: 2,
        },
        [`.MuiBarElement-series-l_id`]: {
          stroke: colors[0],
        },
        [`.MuiBarElement-series-r_id`]: {
          stroke: colors[1],
        },
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: '#006BD6',
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: '#006BD6',
          },
        },
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '35px 35px',
        backgroundPosition: '20px 20px, 20px 20px',
        ...theme.applyStyles('dark', {
          borderColor: 'rgba(255,255,255, 0.1)',
          backgroundImage:
            'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
        }),
      })}
      margin={{
        left: 38,
        right: 40,
        top: 40,
        bottom: 40,
      }}
      xAxis={[{ data: labels }]}
      series={[
        { data: lData, label: 'l', id: 'l_id' },
        { data: rData, label: 'r', id: 'r_id' },
      ]}
      colors={colors}
      height={300}
    />
  );
}
