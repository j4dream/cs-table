import React, { useContext, useCallback, useRef } from 'react';
import {CSTableContext} from './index';
import { processHeaderWidth } from './util';

const returnFalse = () => false;

export default function() {

  const {
    cellWidth,
    cellHeight,
    renderHeader,
    dataAreaState,
    setDataAreaState,
    tableRef,
    colResizeProxyRef,
    header: allHeader,
  } = useContext(CSTableContext);

  const isDraggingRef = useRef(false);
  const draggingCol = useRef();
  const startPosRef = useRef();

  const {
    processedHeader: header,
    colStartIndex,
  } = dataAreaState;

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) return;
    const currHeader = e.currentTarget;
    const rect = currHeader.getBoundingClientRect();
    const bodyStyle = document.body.style;

    if (rect.right - e.pageX < 5) {
      bodyStyle.cursor = 'col-resize';
      draggingCol.current = currHeader.dataset.prop;
    } else {
      bodyStyle.cursor = '';
    }
  }, []);

  const handleMouseOut = useCallback((e) => {
    document.body.style.cursor = '';
  }, []);

  const handleResizeStart = useCallback((e) => {
    const movedDistance = e.clientX - tableRef.current.getBoundingClientRect().left
    colResizeProxyRef.current.style.left = movedDistance + 'px';
    document.body.style.cursor = 'col-resize';
  }, [colResizeProxyRef, tableRef]);

  const handleResizeStop = useCallback((e) => {
    colResizeProxyRef.current.style.visibility = 'hidden';
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleResizeStart);
    document.removeEventListener('mouseup', handleResizeStop);
    isDraggingRef.current = false;
    document.onselectstart = null;
    document.ondragstart = null;
    const offset = e.clientX - startPosRef.current;
    const currH = header.find(h => h.prop === draggingCol.current);
    if (currH) {
      // min 30
      currH.width = Math.max((currH.width || cellWidth) + offset, 30);
      const dataAreaWidth = processHeaderWidth(allHeader, cellWidth, true);
      // force update
      setDataAreaState((prev) => ({...prev, dataAreaWidth}));
    }
  }, [cellWidth, colResizeProxyRef, handleResizeStart, header, setDataAreaState, allHeader]);

  const handleMouseDown = useCallback((e) => {
    if (draggingCol.current) {
      isDraggingRef.current = true;
      const currTarget = e.currentTarget;
      const tableLeft = tableRef.current.getBoundingClientRect().left;
      const startPos = currTarget.getBoundingClientRect().right - tableLeft;
      colResizeProxyRef.current.style.visibility = 'visible';
      colResizeProxyRef.current.style.left = startPos + 'px';
      startPosRef.current = currTarget.getBoundingClientRect().right;

      document.onselectstart = returnFalse;
      document.ondragstart = returnFalse;

      document.addEventListener('mousemove', handleResizeStart);
      document.addEventListener('mouseup', handleResizeStop);

    }
  }, [colResizeProxyRef, handleResizeStart, handleResizeStop, tableRef]);
  
  return (
    header.map((h, i) => (
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
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        { 
          h.renderHeader
            ? h.renderHeader(h, h.prop)
            : renderHeader(h, h.prop)
        }
      </div>
    ))
  );
}
