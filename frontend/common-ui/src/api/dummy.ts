import axios from 'axios';
import { useMutation } from 'react-query';

const handle = axios.create({
  baseURL: 'http://localhost:8080',
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
}

export const usePostSignIn = (path: string) => {
  return useMutation(async (payload: SignInPayload) => {
    const response = await handle.post<SignInResponse>(path, payload);

    return response.data;
  });
};