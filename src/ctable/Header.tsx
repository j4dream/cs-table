import React, { useContext, useCallback, useMemo, useRef } from 'react';
import { CTableContext } from './index';
import HeaderCell from '../HeaderCell';
import useResize from '../hooks/useResize';
import { processHeaderWidth } from './util';

export default function () {
  const {
    cellWidth,
    cellHeight,
    renderHeader,
    dataAreaState,
    setDataAreaState,
    tableRef,
    enableSorting,
    handleSorting,
    colResizeProxyRef,
    header: allHeader,
    enableResize,
  } = useContext(CTableContext);

  const { processedHeader: header } = dataAreaState;

  const onResizeStop = useCallback(
    (offset, draggingProp) => {
      const currH = header.find((h) => h.prop === draggingProp);
      if (currH) {
        // min 30
        currH.width = Math.max((currH.width || cellWidth) + offset, 30);
        const { totalWidth: dataAreaWidth } = processHeaderWidth(allHeader, cellWidth);
        // force update
        setDataAreaState((prev) => ({ ...prev, dataAreaWidth }));
      }
    },
    [header, allHeader, setDataAreaState, cellWidth],
  );

  const { handleMouseMove, handleMouseOut, handleMouseDown } = useResize({
    container: tableRef,
    colResizeProxy: colResizeProxyRef,
    onResizeStop,
  });

  const resizeProps = useMemo(
    () =>
      enableResize
        ? {
            onMouseMove: handleMouseMove,
            onMouseOut: handleMouseOut,
            onMouseDown: handleMouseDown,
          }
        : {},
    [enableResize, handleMouseMove, handleMouseOut, handleMouseDown],
  );

  const dragParentRef = useRef('UNDEFINED_SHEET');

  return header.map((h) => {
    h.width = h.width || cellWidth;
    h.height = h.height || cellHeight;
    h.top = 0;
    return (
      <HeaderCell
        key={h.prop}
        header={h}
        resizeProps={resizeProps}
        dragParentRef={dragParentRef}
        handleSort={handleSorting}
        enableSorting={enableSorting}
        // 兼容旧 API
        renderHeader={h.renderHeader || renderHeader}
      />
    );
  });
}
