import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Typography } from '@mui/material';

import { SignInForm } from './App'
import './index.css'
import { SimplePageFirst } from './pages/page1';
import { SimplePageSecond } from './pages/page2';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignInForm />
  },
  {
    path: '/page1',
    element: <SimplePageFirst />
  },
  {
    path: '/page2',
    element: <SimplePageSecond />
  },
  {
    path: '/',
    element: <Typography>initial page</Typography>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
