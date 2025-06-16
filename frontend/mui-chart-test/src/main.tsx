import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CombinedChart } from './chart-quickstart.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CombinedChart />
  </StrictMode>,
)
