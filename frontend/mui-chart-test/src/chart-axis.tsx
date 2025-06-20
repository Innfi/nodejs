import * as React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

const sample = [1, 10, 30, 50, 70, 90, 110];

export function DoubleAxisChart() {
  const handleMarkClick = (event: any, params: any) => {
    console.log('Clicked mark:', params);
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200 }}>
      <LineChart 
        xAxis={[{data: sample}]}
        yAxis={[
          { id: 'linearAxis', scaleType: 'linear', position: 'left' },
          { id: 'logAxis', scaleType: 'log', position: 'right' }
        ]}
        series={[
          { yAxisId: 'linearAxis', data: sample, label: 'linear' },
          { yAxisId: 'logAxis', data: sample, label: 'log' }
        ]}
        height={400}
        onMarkClick={handleMarkClick}
      />
    </Box>
  );
}
