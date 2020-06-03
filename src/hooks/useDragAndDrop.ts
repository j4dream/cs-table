import { useCallback, useMemo, useRef, useState } from "react"

interface DropOpts {
  onDrop: () => void;
}

export const useDrop = (opts: DropOpts) => {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const [hoverProp, setHoverProp] = useState('');
  
  const dropProps = useMemo(() => ({
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      console.log(e.dataTransfer);
      if (optsRef.current.onDrop) {
        optsRef.current.onDrop();
      }
    },
    onDragEnter: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setHoverProp(e.currentTarget.dataset.parentProp as string);
    },
    onDragLeave: () => {
      setHoverProp('');
    }
  }), [setHoverProp]);

  return {dropProps, hoverProp};
}

export const useDrag = () => {
 const getDragProps = useCallback((data) => {
    return {
      key: JSON.stringify(data),
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        console.log('drag start: ', JSON.stringify(data));
        e.dataTransfer.setData('custom', JSON.stringify(data));
      }
    }
  }, []);

  return getDragProps;
}