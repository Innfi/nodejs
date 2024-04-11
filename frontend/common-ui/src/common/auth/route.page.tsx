import { FC } from "react";
import { Navigate, PathRouteProps, RouteProps } from "react-router-dom";
import { useRecoilState } from "recoil";

import { initialClientState } from "../client.state";

const AuthorizedRoute: FC<RouteProps> = ({ children }) => {
  const [user] = useRecoilState(initialClientState);

  if (user.accessToken.length > 0 && user.refreshToken.length > 0) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export interface AuthorizedPageProps extends PathRouteProps {
  auth?: boolean;
}

export const AuthorizedPage: FC<AuthorizedPageProps> = ({ children, auth }) => {
  if (auth) {
    return <AuthorizedRoute>{children}</AuthorizedRoute>;
  }

  return <>{children}</>;
};