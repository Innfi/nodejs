import { RouteObject, useRoutes } from "react-router-dom";

import { SideBarPage } from "../common/sidebar";
import { SignInForm } from "../common/auth/signin";
import { initialRoutes } from "../initial.module/routes";
import { SimplePageFirst } from "../initial.module/page1";
import Dashboard from "../initial.module/test";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <SideBarPage />,
    children: [
      {
        path: 'page1',
        element: <SimplePageFirst />,
      },
      {
        path: 'signin',
        element: <SignInForm />
      },
      ...initialRoutes,
    ],
  },
  {
    path: '/test',
    element: <Dashboard />
  },
];

export function RenderRouter() {
  return useRoutes(routes);
}