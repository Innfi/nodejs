import { Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";

import { SignInForm } from "../App";
import { initialRoutes } from "../initial.module/routes";

export const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignInForm />
  },
  ...initialRoutes,
  {
    path: '/',
    element: <Typography>initial page</Typography>
  },
]);
