import React, { useMemo, useCallback, useRef } from 'react';
import { STableHeaders, RefDOM } from './';
import { getLastNode } from './util';
import { getScrollBarWidth } from '../util';
import useResize from '../hooks/useResize';
import HeaderCell from '../HeaderCell';

interface RowHeaderProps {
  dynRowHeader: STableHeaders;
  rowHeaderWidth: number;
  rowHeaderHeight: number;
  rowDeepestPath: STableHeaders;
  enableColResize: boolean;
  enableRowResize: boolean;
  containerRef: RefDOM;
  colResizeProxyRef: RefDOM;
  rowResizeProxyRef: RefDOM;
  onUpdate: Function;
  handleRowSort: Function;
  enableRowSorting: boolean;
}

const RowHeader = ({
  dynRowHeader,
  rowHeaderWidth,
  rowHeaderHeight,
  rowDeepestPath,
  enableColResize,
  enableRowResize,
  containerRef,
  colResizeProxyRef,
  rowResizeProxyRef,
  onUpdate,
  handleRowSort,
  enableRowSorting = true,
}: RowHeaderProps): JSX.Element => {
  const onResizeStop = useCallback(
    (offset, prop, type) => {
      let h = dynRowHeader.find((h) => h.prop === prop);
      if (!h) return;
      if (type === 'col') {
        h = rowDeepestPath[h.level];

        if (h && offset) {
          h.width = Math.max(h.width + offset, 30);
        }
      }
      
      if (type === 'row') {
        if (!h.isLeaf) {
          h = getLastNode(h);
        }

        if (h && offset) {
          h.height = Math.max(h.height + offset, 30);
        }
      }
      onUpdate && onUpdate();
    },
    [dynRowHeader, rowDeepestPath, onUpdate],
  );

  const { handleMouseMove, handleMouseOut, handleMouseDown } = useResize({
    container: containerRef,
    colResizeProxy: colResizeProxyRef,
    rowResizeProxy: rowResizeProxyRef,
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
};

export default React.memo(RowHeader);
