import React, { useContext, useMemo } from 'react';
import DataArea from './DataArea';
import Header from './Header';
import './style.css';
import { CTableContext } from './index';
import FixedLeftColumn from './FixedLeftColumn';
import FixedLeftHeader from './FixedLeftHeader';
import NoData from '../share/NoData';

function CTable() {
  const {
    header,
    data,
    scrollBarWidth,
    // width,
    compactHeight = true,
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
    notFoundData,
    enableResize = true,
    emptyText,
    dataAreaState: { dataAreaWidth: areaWidthAfterResize },
  } = useContext(CTableContext);

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

  const nodata = useMemo(() => !!(data && !data.length), [data]);

  const computedHeight = useMemo(() => {
    if (!compactHeight) return height;
    // dataHeight + headerHeight;
    const realHeight = areaHeight + cellHeight;
    // for virtual scroll height;
    if (realHeight < height) return realHeight + scrollBarWidth;
    return height;
  }, [data.length, height]);

  return (
    <div
      ref={tableRef}
      className="c-table"
      style={{ position: 'relative', height: nodata ? 300 : computedHeight }}
    >
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
              height: computedHeight - cellHeight,
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
          height: computedHeight - cellHeight,
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

      {nodata && (
        <div
          style={{
            position: 'absolute',
            top: cellHeight,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {notFoundData ? notFoundData : React.createElement(NoData, { emptyText })}
        </div>
      )}

      <div className="resize-col-proxy" ref={colResizeProxyRef} style={{ visibility: 'hidden' }} />
    </div>
  );
}

CTable.displayName = 'CTable';

export default CTable;
