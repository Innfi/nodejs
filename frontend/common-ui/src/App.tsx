import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';

import { RenderRouter } from './routes/router';

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6">toolbar</Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </Suspense>
  );
}