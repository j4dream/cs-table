import React, { useContext, useCallback, useMemo } from 'react';
import { CSTableContext } from './index';
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
    colResizeProxyRef,
    header: allHeader,
    enableResize,
  } = useContext(CSTableContext);

  const { processedHeader: header } = dataAreaState;

  const onResizeStop = useCallback(
    (offset, draggingProp) => {
      const currH = header.find((h) => h.prop === draggingProp);
      if (currH) {
        // min 30
        currH.width = Math.max((currH.width || cellWidth) + offset, 30);
        const dataAreaWidth = processHeaderWidth(allHeader, cellWidth, true);
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

  return header.map((h, i) => (
    <div
      key={`h-${i}`}
      className="header"
      style={{
        position: 'absolute',
        width: h.width || cellWidth,
        height: cellHeight,
        left: h.left,
      }}
      data-prop={h.prop}
      {...resizeProps}
    >
      {h.renderHeader ? h.renderHeader(h, h.prop) : renderHeader(h, h.prop)}
    </div>
  ));
}
