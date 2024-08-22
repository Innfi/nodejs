import { atom, DefaultValue, selector } from "recoil";

export interface AppState {
  name: string;
  counter: number; 
}

export const defaultAppState = atom<AppState>({
  key: 'appState',
  default: {
    name: 'innfi',
    counter: 0,
  },
});

export const nameSelector = selector({
  key: 'nameSelector',
  get: ({ get }): string => {
    const state = get(defaultAppState);

    return state.name;
  },
  set: ({ set, get }, newName) => {
    const state = get(defaultAppState);

    return set(defaultAppState, {
      ...state,
      name: newName instanceof DefaultValue ? state.name : newName,
    });
  },
});

export const counterSelector = selector({
  key: 'counterSelector',
  get: ({ get }): number => {
    const state = get(defaultAppState);

    return state.counter;
  },
  set: ({ set, get }, newCounter) => {
    const state = get(defaultAppState);

    return set(defaultAppState, {
      ...state,
      counter: newCounter instanceof DefaultValue ? state.counter : newCounter,
    });
  },
});