import { useState, useLayoutEffect, useRef } from 'react';
import { RefDOM } from '../types';

type Dimension = {
  width: number;
  height: number;
};

export function useSize(): [Dimension, RefDOM] {
  const [state, setState] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  const domRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const { clientHeight, clientWidth } = domRef.current as HTMLElement;
    setState({
      width: clientWidth,
      height: clientHeight,
    });
  }, []);

  return [state, domRef as RefDOM];
}
