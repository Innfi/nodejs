import { atom, useSetAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';

interface SubState {
  id: number;
  productTag: string;
  memo: string;
}

interface ClientState {
  id: number;
  name: string;
  attrs: SubState[];
}

const current = atom<ClientState>({
  id: 0,
  name: 'initial',
  attrs: [],
});
let counter = 0;

export const App = () => {
  const setClientState = useSetAtom(current);

  const handleClick = useCallback(() => {
    console.log(`handleClick] `);
    counter++;

    setClientState((prev: ClientState) => {
      console.log(`setClientState] `);

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

const Display = () => {
  //const display = useAtomValue(priceAtom);
  const display = useAtomValue(current);

  return (
    <div>
      {JSON.stringify(display)}
    </div>
  );
};