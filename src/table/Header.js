import React, { useContext } from 'react';
import {CSTableContext} from './index';

export default function() {

  const {
    cellWidth = 120,
    cellHeight = 40,
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
          lineHeight: '40px',
          left: (colStartIndex + i) * cellWidth
        }}>
          {h.label}
        </div>
      )
    )
  );
}
