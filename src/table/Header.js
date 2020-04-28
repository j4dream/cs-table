import React, { useContext } from 'react';
import {CSTableContext} from './index';

export default function() {

  const {
    cellWidth,
    cellHeight,
    dataAreaState,
  } = useContext(CSTableContext);

  const {
    processedHeader: header,
    colStartIndex,
  } = dataAreaState;
  
  return (
    header.map((h, i) => (
      <div
        key={h.prop}
        className="cell"
        style={{
          position: 'absolute',
          width: cellWidth,
          height: cellHeight,
          left: (colStartIndex + i) * cellWidth
        }}>
          {h.label}
        </div>
      )
    )
  );
}
