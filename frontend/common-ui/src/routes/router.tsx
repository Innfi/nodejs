import { RouteObject, useRoutes } from "react-router-dom";

import { SideBarPage } from "../common/sidebar";
import { SignInForm } from "../common/auth/signin";
import { initialRoutes } from "../initial.module/routes";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <SideBarPage />,
    children: [
      {
        path: '/signin',
        element: <SignInForm />
      },
      ...initialRoutes,
    ],
  },
];

export function RenderRouter() {
  return useRoutes(routes);
}