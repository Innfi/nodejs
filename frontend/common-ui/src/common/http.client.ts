import { createContext, useContext } from 'react';
import Axios, { AxiosInstance } from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  responseType: 'json',
});

export const AxiosContext = createContext<AxiosInstance>(axios);

export const useAxios = () => useContext(AxiosContext);
