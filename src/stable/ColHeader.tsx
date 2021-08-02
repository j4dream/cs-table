import React, { useMemo, useCallback, useRef } from 'react';
import { STableHeaders, RefDOM } from "./"
import { getScrollBarWidth } from '../util';
import useResize from '../hooks/useResize';
import { getLastNode } from './util';
import HeaderCell from '../HeaderCell';

interface ColHeaderProps {
  dynColHeader: STableHeaders;
  colHeaderWidth: number;
  colHeaderHeight: number;
  enableColResize: boolean;
  enableRowResize: boolean;
  enableColSorting: boolean;
  containerRef: RefDOM;
  colResizeProxyRef: RefDOM;
  rowResizeProxyRef: RefDOM;
  colDeepestPath: STableHeaders;
  onUpdate: Function;
  handleColSort: Function;
}

const ColHeader = ({
  dynColHeader,
  colHeaderWidth,
  colHeaderHeight,
  enableColResize,
  enableRowResize,
  containerRef,
  colResizeProxyRef,
  rowResizeProxyRef,
  colDeepestPath,
  onUpdate,
  handleColSort,
  enableColSorting,
}: ColHeaderProps): JSX.Element => {
  const onResizeStop = useCallback(
    (offset, prop, type) => {
      let h = dynColHeader.find((h) => h.prop === prop);
      if (!h) return;
      if (type === 'row') {
        h = colDeepestPath[h.level];
        if (h && offset) {
          h.height = Math.max(h.height + offset, 30);
        }
      }

      if (type === 'col') {
        if (!h.isLeaf) {
          h = getLastNode(h);
        }
        if (h && offset) {
          h.width = Math.max(h.width + offset, 30);
        }
      }

      onUpdate && onUpdate();
    },
    [dynColHeader, onUpdate],
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
};

export default React.memo(ColHeader);
