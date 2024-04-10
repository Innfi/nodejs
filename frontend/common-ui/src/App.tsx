import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RenderRouter } from './routes/router';
import 'App.css';

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </Suspense>
  );
}