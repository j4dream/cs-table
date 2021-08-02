import { useState, useCallback } from 'react';

interface ForceUpdateRes {
  updateCount: number;
  forceUpdate: Function;
}

export default (): ForceUpdateRes => {
  const [updateCount, update] = useState<number>(0);

  const forceUpdate = useCallback(() => {
    update((p: number) => p + 1);
  }, [update]);

  return {
    updateCount,
    forceUpdate,
  };
};
