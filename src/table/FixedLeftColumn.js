import React, {useContext} from 'react';
import { CSTableContext } from './index';

export default function()  {

  const {
    cellWidth,
    cellHeight,
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
