import React, { useRef, useState, useCallback } from 'react';
import CSTable from './CSTable';

const CSTableContext = React.createContext({});

export const Provider = (props) => {
  const {
    header,
    data,
    cellWidth = 120,
    cellHeight = 40,
    children
  } = props;

  const dataAreaRef = useRef();
  const headerRef = useRef();
  const fixedColLeftRef = useRef();

  const [dataAreaState, setDataAreaState] = useState({
    processedData: data.filter((_, index) => index < 11),
    processedHeader: header.filter((_, index) => index < 13),
    rowStartIndex: 0,
    colStartIndex: 0,
  });

  const colCacheIndexRef = useRef(0);
  const rowCacheIndexRef = useRef(0);

  const renderCountRef = useRef(0);

  const fixedLeftCol = [
    {
      label: 'Operation',
      prop: 'op',
      width: 80,
      left: 0,
    },
    {
      label: 'Email',
      prop: 'email',
      width: 200,
      left: 80,
    }
  ]

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

    const processedHeader = [];
    for(let i = 0; i < colRenderCount; i++) {
      const tC = header[colStartIndex+i];
      tC && processedHeader.push(tC);
    }
    const processedData = [];
    for(let i = 0; i < rowRenderCount; i++) {
      const tR = data[rowStartIndex+i]
      tR && processedData.push(tR);
    }

    if (fixedLeftCol.length) {

    }
    const precessedFixedData = [];
    

    setDataAreaState({
      processedHeader,
      processedData,
      colStartIndex,
      rowStartIndex,
    });

  }, [header, data]);

  const editorContext = {
    header,
    data,
    // renderCell,
    // width,
    // height,
    cellWidth,
    cellHeight,
    dataAreaRef,
    headerRef,
    fixedColLeftRef,
    handleScroll,
    dataAreaState,
    fixedLeftColWidth: fixedLeftCol.reduce((acc, curr)=> acc + curr.width, 0),
    fixedLeftCol,
    setDataAreaState,
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
