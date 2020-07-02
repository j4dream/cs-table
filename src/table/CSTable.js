import React, { useContext, useMemo } from 'react';
import DataArea from './DataArea';
import Header from './Header';
import './style.css';
import { CSTableContext } from './index';
import FixedLeftColumn from './FixedLeftColumn';
import FixedLeftHeader from './FixedLeftHeader';

function CSTable() {
  const {
    header,
    data,
    scrollBarWidth,
    // width,
    height = 440,
    cellWidth = 120,
    cellHeight = 40,
    handleScroll,
    dataAreaRef,
    headerRef,
    fixedColLeftRef,
    colResizeProxyRef,
    tableRef,
    fixedLeftColWidth,
    preventScroll,
    enableResize = true,
    dataAreaState: { dataAreaWidth: areaWidthAfterResize },
  } = useContext(CSTableContext);

  const rowCount = data.length,
    colCount = header.length;

  const areaWidth = useMemo(() => {
    if (enableResize) {
      return header.reduce((acc, curr) => acc + (curr.width || cellWidth), 0);
    }
    return colCount * cellWidth;
  }, [enableResize, header, colCount, cellWidth]);

  const areaHeight = useMemo(() => {
    return rowCount * cellHeight;
  }, [rowCount, cellHeight]);

  return (
    <div ref={tableRef} className="cs-table" style={{ position: 'relative', height: height }}>
      {preventScroll && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }} />
      )}

      <div ref={headerRef} style={{ overflow: 'hidden', marginLeft: fixedLeftColWidth }}>
        <div
          style={{
            width: (areaWidthAfterResize || areaWidth) + scrollBarWidth,
            position: 'relative',
            height: cellHeight,
          }}
        >
          <Header />
        </div>
      </div>

      {!!fixedLeftColWidth && (
        <>
          <div style={{ position: 'absolute', width: fixedLeftColWidth, top: 0 }}>
            <FixedLeftHeader />
          </div>

          <div
            ref={fixedColLeftRef}
            style={{
              overflow: 'hidden',
              height: height - cellHeight,
              width: fixedLeftColWidth,
              position: 'absolute',
              left: 0,
            }}
          >
            <div style={{ height: areaHeight + scrollBarWidth }}>
              <FixedLeftColumn />
            </div>
          </div>
        </>
      )}

      <div
        ref={dataAreaRef}
        style={{
          position: 'relative',
          overflow: 'auto',
          marginLeft: fixedLeftColWidth,
          height: height - cellHeight,
        }}
        onScroll={handleScroll}
      >
        <div
          style={{
            height: areaHeight,
            width: areaWidthAfterResize || areaWidth,
          }}
        >
          <DataArea />
        </div>
      </div>

      <div className="resize-col-proxy" ref={colResizeProxyRef} style={{ visibility: 'hidden' }} />
    </div>
  );
}

CSTable.displayName = 'CTable';

export default CSTable;
