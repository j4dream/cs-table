// TODO: Support Old browser;

import { useCallback, useRef } from 'react';

const px2num = (px: string): number => +px.replace('px', '');
const nmu2px = (num: number): string => `${num}px`;

export default function useDragggable() {
  const dragBoxRef = useRef<HTMLDivElement>();
  const originPosRef = useRef<number>(0);
  const originOffsetRef = useRef<number>(0);
  const canMove = useRef<boolean>(false);

  const handleMouseMove = useCallback((e) => {
    if (canMove.current) {
      const deltaX = e.pageX - originPosRef.current;
      if (dragBoxRef.current) {
        dragBoxRef.current.style.left = nmu2px(originOffsetRef.current + deltaX);
        dragBoxRef.current.style.zIndex = '2';
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    document.onselectstart = null;
    document.ondragstart = null;
    if (dragBoxRef.current) {
      dragBoxRef.current.style.zIndex = '';
      dragBoxRef.current = void 0;
    }
    originPosRef.current = 0;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = useCallback((e) => {
    const parentNode = <HTMLDivElement>e.currentTarget.parentNode;
    if (e.button === 0 && parentNode) {
      canMove.current = true;
      document.onselectstart = () => false;
      document.ondragstart = () => false;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      originOffsetRef.current = px2num(parentNode.style.left);
      dragBoxRef.current = parentNode;
      originPosRef.current = e.pageX;
    }
  }, []);

  return {
    handleMouseDown,
    handleMouseUp,
  };
}
