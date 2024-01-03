import axios from 'axios';
import { useMutation } from 'react-query';

const handle = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
});

export interface SignInPayload {
  email: string;
  pass: string;
}

export interface SignInResponse {
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserSession {
  accessToken: string;
  refreshToken: string;
}

export const usePostSignIn = () => {
  return useMutation(async (payload: SignInPayload) => {
    const response = await handle.post<SignInResponse>('/user/signin', payload);

    return response.data;
  });
};

export const usePostRefreshSession = () => {
  return useMutation(async (payload: UserSession) => {
    const response = await handle.post<UserSession>('/user/refresh', payload);

    if (response.status === 200) {
      return response.data;
    }

    // TODO: handler token refresh error
  });
};