import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SxStyling } from './chart-custom-style';
// import { DoubleAxisChart } from './chart-axis';
// import { CombinedChart } from './chart-quickstart.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SxStyling />
  </StrictMode>,
)
