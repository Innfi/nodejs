import { useMutation } from "react-query";

import { SignInPayload, SignInResponse, UserSession } from "./entity";
import { useAxios } from "../http.client";

export const usePostSignIn = () => {
  const axios = useAxios();

  return useMutation(async (payload: SignInPayload) => {
    const response = await axios.post<SignInResponse>('/user/signin', payload);

    return response.data;
  });
};

export const usePostRefreshSession = () => {
  const axios = useAxios();

  return useMutation(async (payload: UserSession) => {
    const response = await axios.post<UserSession>('/user/refresh', payload);

    if (response.status === 200) {
      return response.data;
    }

    // TODO: handler token refresh error
  });
};