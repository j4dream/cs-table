import { useCallback, useRef } from 'react';

import { RefDOM } from '../types';

type ResizeParams = {
  container: RefDOM;
  colResizeProxy: RefDOM;
  onResizeStop: (offset: number, col: string) => void;
};

type ResizeRes = {
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseOut: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
};

const returnFalse = () => false;

export default function useResize({
  container,
  colResizeProxy,
  onResizeStop,
}: ResizeParams): ResizeRes {
  const isDraggingRef = useRef<boolean>(false);
  const draggingCol = useRef<string>('');
  const startPosRef = useRef<number>(0);

  const handleResizeStart = useCallback(
    (e) => {
      if (!container.current || !colResizeProxy.current) return;
      const movedDistance = e.clientX - container.current.getBoundingClientRect().left;
      colResizeProxy.current.style.left = movedDistance + 'px';
      document.body.style.cursor = 'col-resize';
    },
    [colResizeProxy, container],
  );

  const handleResizeStop = useCallback(
    (e) => {
      if (!colResizeProxy.current) return;
      colResizeProxy.current.style.visibility = 'hidden';
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleResizeStart);
      document.removeEventListener('mouseup', handleResizeStop);
      isDraggingRef.current = false;
      document.onselectstart = null;
      document.ondragstart = null;
      const offset = e.clientX - startPosRef.current;

      onResizeStop && onResizeStop(offset, draggingCol.current);
    },
    [colResizeProxy, handleResizeStart, onResizeStop],
  );

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) return;
    const currHeader = e.currentTarget;
    const rect = currHeader.getBoundingClientRect();
    const bodyStyle = document.body.style;

    if (rect.right - e.pageX < 5) {
      bodyStyle.cursor = 'col-resize';
      draggingCol.current = currHeader.dataset.prop;
    } else {
      bodyStyle.cursor = '';
      draggingCol.current = '';
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    document.body.style.cursor = '';
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      if (draggingCol.current) {
        if (!container.current || !colResizeProxy.current) return;
        isDraggingRef.current = true;
        const currTarget = e.currentTarget;
        const containLeft = container.current.getBoundingClientRect().left;
        const startPos = currTarget.getBoundingClientRect().right - containLeft;
        colResizeProxy.current.style.visibility = 'visible';
        colResizeProxy.current.style.left = startPos + 'px';
        startPosRef.current = currTarget.getBoundingClientRect().right;

        document.onselectstart = returnFalse;
        document.ondragstart = returnFalse;

        document.addEventListener('mousemove', handleResizeStart);
        document.addEventListener('mouseup', handleResizeStop);
      }
    },
    [colResizeProxy, handleResizeStart, handleResizeStop, container],
  );

  return {
    handleMouseMove,
    handleMouseOut,
    handleMouseDown,
  };
}
