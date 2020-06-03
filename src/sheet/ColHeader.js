import React, { useMemo, useCallback } from 'react';
import { getScrollBarWidth } from '../table/util';
import useResize from '../hooks/useResize';
import useDraggable from '../hooks/useDraggable';
import { useDrag, useDrop } from '../hooks/useDragAndDrop';
import { getLastNode } from './util';
import HeaderCell from './HeaderCell';

export function ColHeader({
  dynColHeader,
  colHeaderWidth,
  colHeaderHeight,
  enableColResize,
  enableRowResize,
  containerRef,
  colResizeProxyRef,
  onUpdate,
  enableSorting = true,
}) {

  const onResizeStop = useCallback((offset, prop) => {
    let h = dynColHeader.find(h => h.prop === prop);
    if (!h.isLeaf) {
      h = getLastNode(h);
    }

    if (h && offset) {
      h.width = Math.max(h.width + offset, 30);
    }

    onUpdate && onUpdate();
  }, [dynColHeader]);

  const { handleMouseMove, handleMouseOut, handleMouseDown } = useResize({
    container: containerRef,
    colResizeProxy: colResizeProxyRef,
    onResizeStop,
  });

  const resizeProps = useMemo(() => (
    enableColResize || enableRowResize
      ? {
        onMouseMove: handleMouseMove,
        onMouseOut: handleMouseOut,
        onMouseDown: handleMouseDown,
      }
      : {}
  ), [enableColResize, enableRowResize, handleMouseMove, handleMouseOut, handleMouseDown]);

  const getDragProps = useDrag();
  const dropProps = useDrop({
    onDrop: () => {}
  });

  const {
    handleMouseDown: onDrapClick,
  } = useDraggable();

  const dragProps = useMemo(() => (
    enableSorting
      ? {
        onMouseDown: onDrapClick,
      }
      : {}
  ), []);

  return (
    <div
      style={{
        position: 'relative',
        height: colHeaderHeight,
        width: colHeaderWidth + getScrollBarWidth(),
      }}
    >
      {
        dynColHeader.map((header) => (
          <HeaderCell key={header.prop} header={header} resizeProps={resizeProps}/>
        ))
      }
    </div>
  );
}