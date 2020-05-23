import React, { useRef, useState, useCallback, useMemo } from 'react';
import CSTable from './CSTable';
import { getScrollBarWidth, processHeaderWidth, getMutableIndexAndCount } from './util';
import useUpdateEffect from './useUpdateEffect';

const CSTableContext = React.createContext({});

const getRangeFromArr = (arr, start, count) => {
  const res = [];
  for(let i = 0; i <= count; i++) {
    const record = arr[start + i]
    record && res.push(record);
  }
  return res;
}

export const Provider = (props) => {
  const {
    header,
    data,
    height = 440,
    cellWidth = 120,
    cellHeight = 40,
    renderCell = (record, rowIndex, prop) => record,
    renderHeader = (header, prop) => header.label,
    children,
    preventScroll = false,
    enableResize = false,
  } = props;

  const dataAreaRef = useRef();
  const headerRef = useRef();
  const fixedColLeftRef = useRef();
  const scrollBarRef = useRef(getScrollBarWidth());
  const colResizeProxyRef = useRef();
  const tableRef = useRef();

  const restHeader = useMemo(
    () => processHeaderWidth(header.filter(h => !h.fixed), cellWidth),
    [header, cellWidth]
  );
  const fixedLeft = useMemo(
    () => processHeaderWidth(header.filter(h => h.fixed), cellWidth),
    [header, cellWidth]
  );

  // design for some fixed element, when data scroll, it has position offset;
  // eg: datepicker, multi select in cell.
  const preventScrollRef = useRef();
  preventScrollRef.current = preventScroll;

  // caculate fixed col width.
  const fixedLeftColWidth = useMemo(() => {
    return fixedLeft.reduce((acc, curr)=> acc + (curr.width || cellWidth), 0);
  }, [fixedLeft, cellWidth]);

  const initWidthCountRef = useRef(Math.ceil((document.body.offsetWidth - fixedLeftColWidth) / cellWidth));
  const initHeightCountRef = useRef(Math.ceil(height / cellHeight));

  const [dataAreaState, setDataAreaState] = useState(() => ({
    processedHeader: getRangeFromArr(restHeader, 0, initWidthCountRef.current),
    processedData: getRangeFromArr(data, 0, initHeightCountRef.current),
    fixedLeftCol: fixedLeft,
    rowStartIndex: 0,
    colStartIndex: 0,
  }));

  // props update
  useUpdateEffect(() => {
    setDataAreaState((preState) => {
      const {
        processedData: preData,
        processedHeader: preHeader,
        fixedLeftCol: preFixedLeftCol,
      } = preState;

      if (preData !== data) {
        preState.processedData = getRangeFromArr(data, 0, initHeightCountRef.current);
      }

      if (preHeader !== header) {
        preState.processedHeader = getRangeFromArr(restHeader, 0, initWidthCountRef.current);
      } 

      if (preFixedLeftCol !== fixedLeft) {
        preState.fixedLeftCol = fixedLeft
      }

      return {
        ...preState,
      };
    });
  }, [data, restHeader, fixedLeft]);

  const colCacheIndexRef = useRef(0);
  const rowCacheIndexRef = useRef(0);

  // cache index, No need 'throttle' for the moment.
  const handleScroll = useCallback((e) => {
    const cellTarget = e.currentTarget;
    if (!cellTarget) return;
    const {
      scrollLeft: sLeft,
      scrollTop: sTop,
      offsetWidth: oWidth,
      offsetHeight: oHeight,
    } = cellTarget;

    // disable resize
    // const colStartIndex = Math.floor(sLeft / cellWidth),
    //       colRenderCount = Math.ceil(oWidth / cellWidth);

    let colStartIndex, colRenderCount;
    if (enableResize) {
      const { startIndex, count } = getMutableIndexAndCount(restHeader, sLeft, dataAreaRef.current.offsetWidth, cellWidth);
      colStartIndex = startIndex;
      colRenderCount = count;
    } else {
      colStartIndex = Math.floor(sLeft / cellWidth);
      colRenderCount = Math.ceil(oWidth / cellWidth);
    }

    const rowStartIndex = Math.floor(sTop / cellHeight),
          rowRenderCount = Math.ceil(oHeight / cellHeight);

    if (headerRef.current) {
      headerRef.current.scrollLeft = sLeft;
    }

    if (fixedColLeftRef.current) {
      fixedColLeftRef.current.scrollTop = sTop;
    }

    // if stay on same cell, do not rerender table.
    if (colCacheIndexRef.current === colStartIndex && rowCacheIndexRef.current === rowStartIndex) return;
    // assign new pos.
    colCacheIndexRef.current = colStartIndex;
    rowCacheIndexRef.current = rowStartIndex;

    const processedHeader = getRangeFromArr(restHeader, colStartIndex, colRenderCount);
    const processedData = getRangeFromArr(data, rowStartIndex, rowRenderCount);
    
    setDataAreaState((prevState) => ({
      ...prevState,
      processedHeader,
      processedData,
      colStartIndex,
      rowStartIndex,
    }));

  }, [restHeader, data, cellWidth, cellHeight, dataAreaRef, enableResize]);

  const editorContext = {
    header: restHeader,
    data,
    // renderCell,
    // width,
    height,
    scrollBarWidth: scrollBarRef.current,
    cellWidth,
    cellHeight,
    dataAreaRef,
    headerRef,
    fixedColLeftRef,
    colResizeProxyRef,
    tableRef,
    handleScroll,
    dataAreaState,
    fixedLeftColWidth,
    setDataAreaState,
    preventScroll: preventScrollRef.current,
    renderCell,
    renderHeader,
    enableResize,
  };

  return (
    <CSTableContext.Provider value={editorContext}>
      {children}
    </CSTableContext.Provider>);
}

export {
  CSTableContext
};

export default React.memo(function CSTableProvider(props) {
  return (
    <Provider {...props}>
      <CSTable/>
    </Provider>
  );
});
