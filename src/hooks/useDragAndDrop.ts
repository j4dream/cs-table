import { useCallback, useMemo, useRef, useState } from "react"

interface DropOpts {
  handleDrop: (s: string) => void;
}

export const useDrop = (opts: DropOpts) => {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const [hoverProp, setHoverProp] = useState('');
  
  const dropProps = useMemo(() => ({
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      // e.persist();
      if (optsRef.current.handleDrop) {
        optsRef.current.handleDrop(e.dataTransfer.getData('custom'));
      }
    },
    onDragEnter: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      console.log('onender dataset: ', e.currentTarget.dataset);
      setHoverProp(e.currentTarget.dataset.parentProp as string);
    },
    onDragLeave: () => {
      setHoverProp('');
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
    }
  }), [setHoverProp]);

  return {dropProps, hoverProp};
}

export const useDrag = (cb: Function) => {

  const cbRef = useRef(cb);

  const getDragProps = useCallback((data) => {
    return {
      key: JSON.stringify(data),
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        console.log('drag start: ', JSON.stringify(data));
        cbRef.current && cbRef.current();
        e.dataTransfer.setData('custom', JSON.stringify(data));
      }
    }
  }, []);

  return getDragProps;
}