import { atom } from "recoil";

export const initialClientState = atom({
  key: 'UserData',
  default: {
    email: '',
    accessToken: '',
    refreshToken: '',
  },
});