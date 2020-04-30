import React, {useContext} from 'react';
import { CSTableContext } from './index';

export default function()  {

  const {
    cellWidth,
    cellHeight,
    dataAreaState,
    renderCell,
  } = useContext(CSTableContext);

  const {
    processedData: data,
    rowStartIndex,
    fixedLeftCol,
  } = dataAreaState;
  return (
    data.map((_, rowIndex) => (
      fixedLeftCol.map((h, colIndex) => (
        <div
          className="cell fixed-left"
          key={`f-c-${rowIndex}-${colIndex}`}
          style={{
            position: 'absolute',
            top: (rowIndex + rowStartIndex) * cellHeight,
            left: h.left,
            width: h.width || cellWidth,
            height: cellHeight
          }}
        >
          { 
            h.renderCell
              ? h.renderCell(data[rowIndex][h.prop], (rowIndex + rowStartIndex), h.prop, h)
              : renderCell(data[rowIndex][h.prop], (rowIndex + rowStartIndex), h.prop, h)
          }
        </div>
      ))
    ))
  );
}
