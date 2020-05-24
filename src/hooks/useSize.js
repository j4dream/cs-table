import { useState, useLayoutEffect, useRef } from "react";

export function useSize() {
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  const domRef = useRef();

  useLayoutEffect(() => {
    const { clientHeight, clientWidth } = domRef.current;
    setState({
      width: clientWidth,
      height: clientHeight,
    });
  }, []);

  return [state, domRef];
}