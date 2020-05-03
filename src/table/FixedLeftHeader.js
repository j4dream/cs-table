import React, {useContext} from 'react';
import { CSTableContext } from './index';

export default function()  {

  const {
    cellWidth,
    cellHeight,
    dataAreaState,
    renderHeader
  } = useContext(CSTableContext);


  const {
    fixedLeftCol,
  } = dataAreaState;

  return (
    fixedLeftCol.map((h, colIndex) => (
      <div
        key={`f-h-${colIndex}`}
        className="header"
        style={{
          position: 'absolute',
          left: h.left,
          width: h.width || cellWidth,
          height: cellHeight
        }}
      >
        { 
          h.renderHeader
            ? h.renderHeader(h, h.prop)
            : renderHeader(h, h.prop)
        }
      </div>
    ))
  );
}
