import { useState, useCallback } from 'react';

type ForceUpdateRes = {
  updateCount: number;
  forceUpdate: Function;
};

export default (): ForceUpdateRes => {
  const [updateCount, update] = useState(0);

  const forceUpdate = useCallback(() => {
    update((p: number) => p + 1);
  }, [update]);

  return {
    updateCount,
    forceUpdate,
  };
};
