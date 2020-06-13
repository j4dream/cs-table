import { useCallback, useMemo, useRef, useState } from "react"

interface DropOpts {
  handleDrop: (dragProp: string, dropProp: string) => void;
}

export const useDrop = (opts: DropOpts) => {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const [hoverProp, setHoverProp] = useState('');
  
  const dropProps = useMemo(() => ({
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      // e.persist();
      if (optsRef.current.handleDrop) {
        optsRef.current.handleDrop(e.dataTransfer.getData('dragProp'), e.currentTarget.dataset.prop || '');
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
  }), [optsRef, setHoverProp]);

  return {dropProps, hoverProp};
}

interface DragOpts {
  handleDrag: (dragProp: string) => void;
}

export const useDrag = (opts: DragOpts) => {

  const optsRef = useRef(opts);
  optsRef.current = opts;

  const getDragProps = useCallback((prop) => {
    return {
      key: JSON.stringify(prop),
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        optsRef.current.handleDrag && optsRef.current.handleDrag(prop);
        e.dataTransfer.setData('dragProp', prop);
      }
    }
  }, [optsRef]);

  return getDragProps;
}