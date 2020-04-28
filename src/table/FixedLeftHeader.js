import React, {useContext} from 'react';
import { CSTableContext } from './index';

export default function()  {

  const {
    cellWidth,
    cellHeight,
    fixedLeftCol,
  } = useContext(CSTableContext);

  return (
    fixedLeftCol.map((h) => (
      <div
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
