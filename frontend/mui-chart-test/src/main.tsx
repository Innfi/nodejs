import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DoubleAxisChart } from './chart-axis';
// import { CombinedChart } from './chart-quickstart.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DoubleAxisChart />
  </StrictMode>,
)
