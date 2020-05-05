import React, { useContext, useMemo } from 'react';
import DataArea from './DataArea';
import Header from './Header';
import './style.css';
import { CSTableContext } from './index';
import FixedLeftColumn from './FixedLeftColumn';
import FixedLeftHeader from './FixedLeftHeader';
export default function CSTable() {
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
    dataAreaState: {
      dataAreaWidth: areaWidthAfterResize
    }
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
  return /*#__PURE__*/React.createElement("div", {
    ref: tableRef,
    className: "cs-table",
    style: {
      position: 'relative',
      height: height
    }
  }, preventScroll && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: headerRef,
    style: {
      overflow: 'hidden',
      marginLeft: fixedLeftColWidth
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: (areaWidthAfterResize || areaWidth) + scrollBarWidth,
      position: 'relative',
      height: cellHeight
    }
  }, /*#__PURE__*/React.createElement(Header, null))), !!fixedLeftColWidth && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: fixedLeftColWidth,
      top: 0
    }
  }, /*#__PURE__*/React.createElement(FixedLeftHeader, null)), /*#__PURE__*/React.createElement("div", {
    ref: fixedColLeftRef,
    style: {
      overflow: 'hidden',
      height: height - cellHeight,
      width: fixedLeftColWidth,
      position: 'absolute',
      left: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: areaHeight + scrollBarWidth
    }
  }, /*#__PURE__*/React.createElement(FixedLeftColumn, null)))), /*#__PURE__*/React.createElement("div", {
    ref: dataAreaRef,
    style: {
      position: 'relative',
      overflow: 'auto',
      marginLeft: fixedLeftColWidth,
      height: height - cellHeight
    },
    onScroll: handleScroll
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: areaHeight,
      width: areaWidthAfterResize || areaWidth
    }
  }, /*#__PURE__*/React.createElement(DataArea, null))), /*#__PURE__*/React.createElement("div", {
    className: "resize-col-proxy",
    ref: colResizeProxyRef,
    style: {
      visibility: 'hidden'
    }
  }));
}