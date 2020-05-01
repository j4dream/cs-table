import React, { useRef, useState, useCallback, useMemo } from 'react';
import CSTable from './CSTable';
import { getScrollBarWidth } from './util';
import useUpdateEffect from './useUpdateEffect';
const CSTableContext = React.createContext({});
const setTester = new Set();

const getRangeFromArr = (arr, start, count) => {
  const res = [];

  for (let i = 0; i <= count; i++) {
    const record = arr[start + i];
    record && res.push(record);
  }

  return res;
};

const processFixedHeader = header => {
  const filteredHeader = header.filter(h => h.fixed);
  filteredHeader.reduce((acc, curr) => {
    curr.left = acc;
    return curr.width + acc;
  }, 0);
  return filteredHeader;
};

export const Provider = props => {
  const {
    header,
    data,
    height = 440,
    cellWidth = 120,
    cellHeight = 40,
    renderCell = (record, rowIndex, prop) => record,
    renderHeader = (header, prop) => header.label,
    children,
    preventScroll = false
  } = props;
  const dataAreaRef = useRef();
  const headerRef = useRef();
  const fixedColLeftRef = useRef();
  const scrollBarRef = useRef(getScrollBarWidth());
  const restHeader = useMemo(() => header.filter(h => !h.fixed), [header]);
  const fixedLeft = useMemo(() => processFixedHeader(header), [header]); // design for some fixed element, when data scroll, it has position offset;
  // eg: datepicker, multi select in cell.

  const preventScrollRef = useRef();
  preventScrollRef.current = preventScroll;
  const [dataAreaState, setDataAreaState] = useState(() => ({
    processedHeader: getRangeFromArr(restHeader, 0, 11),
    processedData: getRangeFromArr(data, 0, 11),
    fixedLeftCol: fixedLeft,
    rowStartIndex: 0,
    colStartIndex: 0
  }));
  useUpdateEffect(() => {
    setDataAreaState(prev => {
      return { ...prev,
        processedData: getRangeFromArr(data, 0, 11)
      };
    });
  }, [data]);
  useUpdateEffect(() => {
    setDataAreaState(prev => {
      return { ...prev,
        fixedLeftCol: fixedLeft
      };
    });
  }, [fixedLeft]);
  useUpdateEffect(() => {
    setDataAreaState(prev => {
      return { ...prev,
        processedHeader: getRangeFromArr(restHeader, 0, 11)
      };
    });
  }, [restHeader]);
  const fixedLeftColWidth = useMemo(() => {
    return dataAreaState.fixedLeftCol.reduce((acc, curr) => acc + (curr.width || cellWidth), 0);
  }, [dataAreaState.fixedLeftCol, cellWidth]);
  const colCacheIndexRef = useRef(0);
  const rowCacheIndexRef = useRef(0);
  const handleScroll = useCallback(e => {
    const cellTarget = e.currentTarget;
    if (!cellTarget) return;
    const {
      scrollLeft: sLeft,
      scrollTop: sTop,
      offsetWidth: oWidth,
      offsetHeight: oHeight
    } = cellTarget;
    const colStartIndex = Math.floor(sLeft / cellWidth),
          colRenderCount = Math.ceil(oWidth / cellWidth);
    const rowStartIndex = Math.floor(sTop / cellHeight),
          rowRenderCount = Math.ceil(oHeight / cellHeight);

    if (headerRef.current) {
      headerRef.current.scrollLeft = sLeft;
    }

    if (fixedColLeftRef.current) {
      fixedColLeftRef.current.scrollTop = sTop;
    } // if stay on same cell, do not rerender table.


    if (colCacheIndexRef.current === colStartIndex && rowCacheIndexRef.current === rowStartIndex) return; // assign new pos.

    colCacheIndexRef.current = colStartIndex;
    rowCacheIndexRef.current = rowStartIndex;
    const processedHeader = getRangeFromArr(restHeader, colStartIndex, colRenderCount);
    const processedData = getRangeFromArr(data, rowStartIndex, rowRenderCount);
    setDataAreaState(prevState => ({ ...prevState,
      processedHeader,
      processedData,
      colStartIndex,
      rowStartIndex
    }));
  }, [restHeader, data]);
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
    handleScroll,
    dataAreaState,
    fixedLeftColWidth,
    setDataAreaState,
    preventScroll: preventScrollRef.current,
    renderCell,
    renderHeader
  };
  return /*#__PURE__*/React.createElement(CSTableContext.Provider, {
    value: editorContext
  }, children);
};
export { CSTableContext };
export default React.memo(function CSTableProvider(props) {
  return /*#__PURE__*/React.createElement(Provider, props, /*#__PURE__*/React.createElement(CSTable, null));
});