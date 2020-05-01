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
    fixedLeftColWidth,
    preventScroll,
  } = useContext(CSTableContext);

  const rowCount = data.length,
        colCount = header.length;

  const [dataAreaState, setDataAreaState] = useState({areaWidth: colCount * cellWidth, areaHeight: rowCount * cellHeight});

  useUpdateEffect(() => {
    setDataAreaState({
      areaWidth: colCount * cellWidth,
      areaHeight: rowCount * cellHeight
    });
  }, [colCount, cellWidth, rowCount, cellHeight]);


  return (
    <div className="cs-table" style={{position: 'relative', height: height}}>
      
      {
        preventScroll && <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2}}/>
      }
      
      <div ref={headerRef} style={{overflow: 'hidden', marginLeft: fixedLeftColWidth}}>
        <div style={{width: dataAreaState.areaWidth + scrollBarWidth, position: 'relative', height: cellHeight}}>
          <Header />
        </div>
      </div>

      {
        !!fixedLeftColWidth && (
          <>
            <div style={{position:'absolute', width: fixedLeftColWidth, top: 0}}>
              <FixedLeftHeader />
            </div>

            <div
              ref={fixedColLeftRef}
              style={{
                overflow: 'hidden',
                height: height - cellHeight,
                width: fixedLeftColWidth,
                position: 'absolute',
                left: 0
              }}
            >
              <div style={{height: dataAreaState.areaHeight + scrollBarWidth}}>
                <FixedLeftColumn />
              </div>
            </div>
          </>
        )
      }
    
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
