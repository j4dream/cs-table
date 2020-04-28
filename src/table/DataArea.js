import React, {useContext} from 'react';
import {CSTableContext} from './index';

export default function() {

  console.log('render data area');
  const {
    renderCell,
    width,
    height,
    cellWidth = 120,
    cellHeight = 40,
    dataAreaState,
  } = useContext(CSTableContext);

  const {
    processedHeader: header,
    processedData: data,
    rowStartIndex,
    colStartIndex,
  } = dataAreaState;

  return ( 
    data.map((row, rowIndex) => (
      header.map((h, colIndex) => (
        <div
          className="cell"
          style={{
            position: 'absolute',
            top: (rowIndex + rowStartIndex) * cellHeight,
            left: (colStartIndex + colIndex) * cellWidth,
            width: cellWidth,
            height: cellHeight
          }}
        >
          {data[rowIndex][h.prop]}
        </div>
      ))
    ))
  );
}