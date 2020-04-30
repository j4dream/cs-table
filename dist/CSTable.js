import React, { useState, useContext } from 'react';
import DataArea from './DataArea';
import Header from './Header';
import './style.css';
import { CSTableContext } from './index';
import FixedLeftColumn from './FixedLeftColumn';
import FixedLeftHeader from './FixedLeftHeader';
import useUpdateEffect from './useUpdateEffect';
export default function CSTable() {
  console.log('render cs table');
  const {
    header,
    data,
    scrollBarWidth,
    width,
    height = 440,
    cellWidth = 120,
    cellHeight = 40,
    handleScroll,
    dataAreaRef,
    headerRef,
    fixedColLeftRef,
    fixedLeftColWidth
  } = useContext(CSTableContext);
  const rowCount = data.length,
        colCount = header.length;
  const [dataAreaState, setDataAreaState] = useState({
    areaWidth: colCount * cellWidth,
    areaHeight: rowCount * cellHeight
  });
  useUpdateEffect(() => {
    setDataAreaState({
      areaWidth: colCount * cellWidth,
      areaHeight: rowCount * cellHeight
    });
  }, [colCount, cellWidth, rowCount, cellHeight]);
  return /*#__PURE__*/React.createElement("div", {
    className: "cs-table",
    style: {
      position: 'relative',
      height: height
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: headerRef,
    style: {
      overflow: 'hidden',
      marginLeft: fixedLeftColWidth
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: dataAreaState.areaWidth + scrollBarWidth,
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
      height: dataAreaState.areaHeight + scrollBarWidth
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
      height: dataAreaState.areaHeight,
      width: dataAreaState.areaWidth
    }
  }, /*#__PURE__*/React.createElement(DataArea, null))));
}