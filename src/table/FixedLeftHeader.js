import React, {useContext} from 'react';
import { CSTableContext } from './index';

export default function()  {

  const {
    cellWidth = 120,
    cellHeight = 40,
    fixedLeftCol,
  } = useContext(CSTableContext);

  return (
    fixedLeftCol.map((h) => (
      <div
        className="cell"
        style={{
          position: 'absolute',
          lineHeight: '40px',
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
