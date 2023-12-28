import { Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";

import { SignInForm } from "./App";
import { SimplePageFirst } from "./pages/page1";
import { SimplePageSecond } from "./pages/page2";

export const router = createBrowserRouter([
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
