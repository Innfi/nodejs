import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

import { current, ClientState } from './state/client-state';
import { Display } from './display';

let counter = 0;

export const App = () => {
  const setClientState = useSetAtom(current);

  const handleClick = useCallback(() => {
    counter++;

    setClientState((prev: ClientState) => {
      return {
        ...prev,
        attrs: [
          ...prev.attrs,
        {
          id: counter,
          productTag: `sub${counter}`,
          memo: 'test memo'
        }
        ],
      };
    });
  }, [current]);

  return (
    <div>
      <button onClick={() => handleClick()}>add</button>
      <Display />
    </div>
  );
};
