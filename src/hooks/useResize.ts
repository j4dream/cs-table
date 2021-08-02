import { useCallback, useRef } from 'react';
import { RefDOM } from '../types';

type DragType = 'col' | 'row';

type ResizeParams = {
  container: RefDOM;
  colResizeProxy: RefDOM;
  rowResizeProxy?: RefDOM;
  onResizeStop: (offset: number, col: string, type: DragType) => void;
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
  rowResizeProxy,
  onResizeStop,
}: ResizeParams): ResizeRes {
  const isDraggingRef = useRef<boolean>(false);
  const draggingColRef = useRef<string>('');
  const draggingTypeRef = useRef<DragType>('col');
  const startPosRef = useRef<number>(0);

  const handleResizeStart = useCallback(
    (e) => {
      if (!container.current || !colResizeProxy.current) return;
      if (draggingTypeRef.current === 'col') {
        const movedDistance = e.clientX - container.current.getBoundingClientRect().left;
        colResizeProxy.current.style.left = movedDistance + 'px';
        document.body.style.cursor = 'col-resize';
      }
      if (draggingTypeRef.current === 'row') {
        const movedDistance = e.clientY - container.current.getBoundingClientRect().top;
        rowResizeProxy.current.style.top = movedDistance + 'px';
        document.body.style.cursor = 'row-resize';
      }
    },
    [colResizeProxy, rowResizeProxy, container],
  );

  const handleResizeStop = useCallback(
    (e) => {
      if (colResizeProxy && colResizeProxy.current) {
        colResizeProxy.current.style.visibility = 'hidden';
      }
      if (rowResizeProxy && rowResizeProxy.current) {
        rowResizeProxy.current.style.visibility = 'hidden';
      }

      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleResizeStart);
      document.removeEventListener('mouseup', handleResizeStop);
      isDraggingRef.current = false;
      document.onselectstart = null;
      document.ondragstart = null;
      const offsetX = e.clientX - startPosRef.current;
      const offsetY = e.clientY - startPosRef.current;

      onResizeStop &&
        onResizeStop(
          draggingTypeRef.current === 'col' ? offsetX : offsetY,
          draggingColRef.current,
          draggingTypeRef.current,
        );
    },
    [colResizeProxy, rowResizeProxy, handleResizeStart, onResizeStop],
  );

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) return;
    const currHeader = e.currentTarget;
    const rect = currHeader.getBoundingClientRect();
    const bodyStyle = document.body.style;

    if (rect.right - e.pageX < 5 && colResizeProxy) {
      bodyStyle.cursor = 'col-resize';
      draggingTypeRef.current = 'col';
      draggingColRef.current = currHeader.dataset.prop;
    } else if (rect.bottom - e.pageY < 5 && rowResizeProxy) {
      bodyStyle.cursor = 'row-resize';
      draggingTypeRef.current = 'row';
      draggingColRef.current = currHeader.dataset.prop;
    } else {
      bodyStyle.cursor = '';
      draggingColRef.current = '';
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    document.body.style.cursor = '';
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      if (draggingColRef.current) {
        if (!container.current || !colResizeProxy.current) return;
        isDraggingRef.current = true;
        const currTarget = e.currentTarget;
        if (draggingTypeRef.current === 'col') {
          const containLeft = container.current.getBoundingClientRect().left;
          const startPos = currTarget.getBoundingClientRect().right - containLeft;
          colResizeProxy.current.style.visibility = 'visible';
          colResizeProxy.current.style.left = startPos + 'px';
          startPosRef.current = currTarget.getBoundingClientRect().right;
        }
        if (draggingTypeRef.current === 'row') {
          const containBottom = container.current.getBoundingClientRect().bottom;
          const startPos = currTarget.getBoundingClientRect().top - containBottom;
          rowResizeProxy.current.style.visibility = 'visible';
          rowResizeProxy.current.style.top = startPos + 'px';
          startPosRef.current = currTarget.getBoundingClientRect().bottom;
        }

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
