import React from "react";
import { RouteObject } from "react-router";

import { SimpleHtmlEditor } from "./editor";
import { SimplePageFirst } from "./page1";
import { SimplePageSecond } from "./page2";
import { AuthorizedPage } from "../common/auth/route.page";

export const initialRoutes: RouteObject[] = [
  {
    path: '/page1',
    element: <SimplePageFirst />,
  },
  {
    path: '/page2',
    element: <SimplePageSecond />,
  },
  {
    path: '/editor',
    element: (
      <AuthorizedPage auth={true}>
        <SimpleHtmlEditor />,
      </AuthorizedPage>
    ),
  },
];