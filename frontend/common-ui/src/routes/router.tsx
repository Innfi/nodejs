import { Typography } from "@mui/material";
import { RouteObject, useRoutes } from "react-router-dom";

import { SignInForm } from "../common/auth/signin";
import { initialRoutes } from "../initial.module/routes";

export const routes: RouteObject[] = [
  {
    path: '/signin',
    element: <SignInForm />
  },
  ...initialRoutes,
  {
    path: '/',
    element: <Typography>initial page</Typography>
  },
];

export function RenderRouter() {
  return useRoutes(routes);
}