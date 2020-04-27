import React, { useState, useCallback, useContext } from 'react';
import DataArea from './DataArea';
import Header from './Header';
import './style.css';
import { CSTableContext } from './index';
import FixedLeftColumn from './FixedLeftColumn';

export default function CSTable() {

  console.log('render cs table');

  const {
    header,
    data,
    renderCell,
    width,
    height,
    cellWidth = 120,
    cellHeight = 40,
    handleScroll,
    dataAreaRef,
    headerRef,
    fixedLeftCol,
    fixedLeftColWidth,
  } = useContext(CSTableContext);

  const rowCount = data.length,
        colCount = header.length;

  const [dataAreaState, setDataAreaState] = useState({areaWidth: colCount * cellWidth, areaHeight: rowCount * cellHeight});

  console.log(fixedLeftColWidth);

  return (
    <div className="cs-table" style={{position: 'relative', height: 415}}>

      <div id="header" ref={headerRef} style={{overflow: 'hidden', marginLeft: fixedLeftColWidth}}>
        <div id="header-2"  style={{width: dataAreaState.areaWidth, position: 'relative', height: 41}}>
          <Header />
        </div>
      </div>

      <div>
        <FixedLeftColumn />
      </div>

      <div
        ref={dataAreaRef}
        style={{
          position: 'relative',
          overflow: 'auto',
          marginLeft: fixedLeftColWidth,
          height: 360 + 15,
        }}
        onScroll={handleScroll}
      >
        <div
          style={{
            height: dataAreaState.areaHeight,
            width: dataAreaState.areaWidth,
          }}
        >
          <DataArea /> 
        </div>
      </div>
    </div>
  );
}
