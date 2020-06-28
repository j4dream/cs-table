import { useEffect, useRef } from 'react';

const updateEffect: typeof useEffect = (fnc, deps) => {
  const isMountRef = useRef(false);

  useEffect(() => {
    if (!isMountRef.current) {
      isMountRef.current = true;
    } else {
      return fnc();
    }
  }, deps);
};

export default updateEffect;
