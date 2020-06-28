import React, { useMemo, useCallback, useRef } from 'react';
import { getScrollBarWidth } from '../table/util';
import useResize from '../hooks/useResize';
import HeaderCell from './HeaderCell';

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
  handleRowSort,
  enableRowSorting = true,
}) {
  const onResizeStop = useCallback(
    (offset, prop) => {
      let h = dynRowHeader.find((h) => h.prop === prop);

      h = rowDeepestPath[h.level];

      if (h && offset) {
        h.width = Math.max(h.width + offset, 30);
      }

      onUpdate && onUpdate();
    },
    [dynRowHeader, rowDeepestPath, onUpdate],
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
        height: rowHeaderHeight + getScrollBarWidth(),
        width: rowHeaderWidth,
      }}
    >
      {dynRowHeader.map((header) => (
        <HeaderCell
          key={header.prop}
          header={header}
          resizeProps={resizeProps}
          dragParentRef={dragParentRef}
          handleSort={handleRowSort}
          enableSorting={enableRowSorting}
        />
      ))}
    </div>
  );
}
