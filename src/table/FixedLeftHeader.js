import React, {useContext} from 'react';
import { CSTableContext } from './index';

export default function()  {

  const {
    cellWidth,
    cellHeight,
    dataAreaState
  } = useContext(CSTableContext);


  const {
    fixedLeftCol,
  } = dataAreaState;

  console.log('fixedLeftCol', fixedLeftCol);

  return (
    fixedLeftCol.map((h, colIndex) => (
      <div
        key={`f-h-${colIndex}`}
        className="cell"
        style={{
          position: 'absolute',
          left: h.left,
          width: h.width || cellWidth,
          height: cellHeight
        }}
      >
        {h.label}
      </div>
    ))
  );
}
