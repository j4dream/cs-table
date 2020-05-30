import React, { useMemo, useCallback } from 'react';
import { getScrollBarWidth } from '../table/util';
import useResize from '../hooks/useResize';
import { getLastNode } from './util';

export function ColHeader({
  dynColHeader,
  colHeaderWidth,
  colHeaderHeight,
  enableColResize,
  enableRowResize,
  containerRef,
  colResizeProxyRef,
  onUpdate,
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

  return (
    <div
      style={{
        position: 'relative',
        height: colHeaderHeight,
        width: colHeaderWidth + getScrollBarWidth(),
      }}
    >
      {
        dynColHeader.map(({ top, left, width, height, label, prop }) => (
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