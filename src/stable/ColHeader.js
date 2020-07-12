import React, { useMemo, useCallback, useRef } from 'react';
import { getScrollBarWidth } from '../util';
import useResize from '../hooks/useResize';
import { getLastNode } from './util';
import HeaderCell from '../HeaderCell';

export function ColHeader({
  dynColHeader,
  colHeaderWidth,
  colHeaderHeight,
  enableColResize,
  enableRowResize,
  containerRef,
  colResizeProxyRef,
  onUpdate,
  handleColSort,
  enableColSorting,
}) {
  const onResizeStop = useCallback(
    (offset, prop) => {
      let h = dynColHeader.find((h) => h.prop === prop);
      if (!h.isLeaf) {
        h = getLastNode(h);
      }

      if (h && offset) {
        h.width = Math.max(h.width + offset, 30);
      }

      onUpdate && onUpdate();
    },
    [dynColHeader, onUpdate],
  );

  const { handleMouseMove, handleMouseOut, handleMouseDown } = useResize({
    container: containerRef,
    colResizeProxy: colResizeProxyRef,
    onResizeStop,
  });

  const resizeProps = useMemo(
    () =>
      enableColResize || enableRowResize
        ? {
            onMouseMove: handleMouseMove,
            onMouseOut: handleMouseOut,
            onMouseDown: handleMouseDown,
          }
        : {},
    [enableColResize, enableRowResize, handleMouseMove, handleMouseOut, handleMouseDown],
  );

  const dragParentRef = useRef('UNDEFINED_SHEET');

  return (
    <div
      style={{
        position: 'relative',
        height: colHeaderHeight,
        width: colHeaderWidth + getScrollBarWidth(),
      }}
    >
      {dynColHeader.map((header) => (
        <HeaderCell
          key={header.prop}
          header={header}
          resizeProps={resizeProps}
          dragParentRef={dragParentRef}
          handleSort={handleColSort}
          enableSorting={enableColSorting}
        />
      ))}
    </div>
  );
}
