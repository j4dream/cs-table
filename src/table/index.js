import React, { useRef, useState, useCallback, useMemo } from 'react';
import CSTable from './CSTable';
import { getScrollBarWidth } from '../component/util';

const CSTableContext = React.createContext({});

const getRangeFromArr = (arr, start, count) => {
  const res = [];
  for(let i = 0; i < count; i++) {
    const record = arr[start + i]
    record && res.push(record);
  }
  return res;
}

const processFixedHeader = (header) => {
  const filteredHeader = header.filter((h) => h.fixed);
  filteredHeader.reduce((acc, curr) => {
    curr.left = acc;
    return curr.width + acc;
  }, 0);
  return filteredHeader;
}

export const Provider = (props) => {
  const {
    header,
    data,
    height = 440,
    cellWidth = 120,
    cellHeight = 40,
    renderCell = (record, prop) => record[prop],
    renderHeader = (header, prop) => header[prop],
    children,
  } = props;

  const dataAreaRef = useRef();
  const headerRef = useRef();
  const fixedColLeftRef = useRef();
  const scrollBarRef = useRef(getScrollBarWidth());

  const fixedLeftCol = processFixedHeader(header);

  const [dataAreaState, setDataAreaState] = useState({
    processedHeader: getRangeFromArr(header, 0, 11),
    processedData: getRangeFromArr(data, 0, 11),
    fixedLeftCol,
    rowStartIndex: 0,
    colStartIndex: 0,
  });

  const fixedLeftColWidth = useMemo(() => {
    return fixedLeftCol.reduce((acc, curr)=> acc + curr.width, 0);
  }, [fixedLeftCol]);

  const colCacheIndexRef = useRef(0);
  const rowCacheIndexRef = useRef(0);

  const handleScroll = useCallback((e) => {
    const sLeft = e.target.scrollLeft,
          sTop = e.target.scrollTop,
          oWidth = e.target.offsetWidth,
          oHeight = e.target.offsetHeight;

    const colStartIndex = Math.floor(sLeft / cellWidth),
          colRenderCount = Math.ceil(oWidth / cellWidth);

    const rowStartIndex = Math.floor(sTop / cellHeight),
          rowRenderCount = Math.ceil(oHeight / cellHeight);

    if (headerRef.current) {
      headerRef.current.scrollLeft = sLeft;
    }

    if (fixedColLeftRef.current) {
      fixedColLeftRef.current.scrollTop = sTop;
    }

    // if stay on same cell, do not rerender table.
    if (colCacheIndexRef.current === colStartIndex && rowCacheIndexRef.current == rowStartIndex) return;
    // assign new pos.
    colCacheIndexRef.current = colStartIndex;
    rowCacheIndexRef.current = rowStartIndex;

    const processedHeader = getRangeFromArr(header, colStartIndex, colRenderCount);
    const processedData = getRangeFromArr(data, rowStartIndex, rowRenderCount);

    if (fixedLeftCol.length) {

    }
    const precessedFixedData = [];
    

    setDataAreaState({
      processedHeader,
      processedData,
      colStartIndex,
      fixedLeftCol,
      rowStartIndex,
    });

  }, [header, data]);

  const editorContext = {
    header,
    data,
    // renderCell,
    // width,
    height,
    scrollWidth: scrollBarRef.current,
    cellWidth,
    cellHeight,
    dataAreaRef,
    headerRef,
    fixedColLeftRef,
    handleScroll,
    dataAreaState,
    fixedLeftColWidth,
    setDataAreaState,
    renderCell,
    renderHeader,
  };

  return (
    <CSTableContext.Provider value={editorContext}>
      {children}
    </CSTableContext.Provider>);
}

export {
  CSTableContext
};

export default function CSTableProvider(props) {

  return (
    <Provider {...props}>
      <CSTable/>
    </Provider>
  );
}
