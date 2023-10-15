import { useAtomValue } from "jotai";

import { current } from "./state/client-state";

export const Display = () => {
  const display = useAtomValue(current);

  return (
    <div>
      {JSON.stringify(display)}
    </div>
  );
};
