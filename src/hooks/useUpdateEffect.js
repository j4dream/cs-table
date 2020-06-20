import { useEffect, useRef } from 'react';

export default (fnc, deps) => {
  const isMountRef = useRef(false);

  useEffect(() => {
    if (!isMountRef.current) {
      isMountRef.current = true;
    } else {
      return fnc();
    }
  }, deps);
};
