import React, { useMemo, useCallback } from 'react';
import { getScrollBarWidth } from '../table/util';
import useResize from '../hooks/useResize';
import { getLastNode } from './util';

export function RowHeader({
  dynRowHeader,
  rowHeaderWidth,
  rowHeaderHeight,
  rowDeepestPath,
  enableColResize,
  enableRowResize,
  containerRef,
  colResizeProxyRef,
  onUpdate,
  enableSorting = true,
}) {

  const onResizeStop = useCallback((offset, prop) => {
    debugger;
    let h = dynRowHeader.find(h => h.prop === prop);

    h = rowDeepestPath[h.level];

    if (h && offset) {
      h.width = Math.max(h.width + offset, 30);
    }

    onUpdate && onUpdate();
  }, [dynRowHeader, rowDeepestPath]);

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

  return (
    <div
      style={{
        position: 'relative',
        height: rowHeaderHeight + + getScrollBarWidth(),
        width: rowHeaderWidth,
      }}
    >
      {
        dynRowHeader.map(({ top, left, width, height, label, prop }) => (
          <div
            className="header"
            key={prop}
            style={{
              position: 'absolute',
              top: top,
              left: left,
              width: width,
              height: height,
            }}
            data-prop={prop}
            {...resizeProps}
          >
            {label}
          </div>
        ))
      }
    </div>
  );
}