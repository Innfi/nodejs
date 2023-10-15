import { atom } from "jotai";

export interface SubState {
  id: number;
  productTag: string;
  memo: string;
}

export interface ClientState {
  id: number;
  name: string;
  attrs: SubState[];
}

export const current = atom<ClientState>({
  id: 0,
  name: 'initial',
  attrs: [],
});
