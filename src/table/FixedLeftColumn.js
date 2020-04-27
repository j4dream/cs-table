import React, {useContext} from 'react';
import { CSTableContext } from './index';

export default function()  {

  const {
    cellWidth = 120,
    cellHeight = 40,
    dataAreaState,
    fixedLeftCol,
  } = useContext(CSTableContext);

  const {
    processedData: data,
    rowStartIndex,
  } = dataAreaState;
  return (
    data.map((_, rowIndex) => (
      fixedLeftCol.map((h) => (
        <div
          className="cell"
          style={{
            position: 'absolute',
            top: (rowIndex + rowStartIndex) * cellHeight,
            lineHeight: '40px',
            left: h.left,
            width: h.width || cellWidth,
            height: cellHeight
          }}
        >
          {data[rowIndex][h.prop]}
        </div>
      ))
    ))
  );
}
