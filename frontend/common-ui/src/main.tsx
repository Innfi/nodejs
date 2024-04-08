import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './index.css'
import { router } from './routes/router';
import { queryClient } from './common/query.client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
