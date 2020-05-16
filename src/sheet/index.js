import React from 'react';

import useTree from './useTree';

export default function(props) {

  const { colHeader } = useTree(props.colHeader);
  const { rowHeader } = useTree(props.rowHeader);

  console.log('ddr :', rowHeader);

  return (
    <div
      className="cs-sheet"
      style={{
        height: 400,
        position: 'relative',
      }}
    >
      <div className="cs-sheet-col-header">
        {
          colHeader.map( cls => (
            cls.map(cl => (
              <div
                className="header"
                style={{
                  position: 'absolute',
                  top: cl.top,
                  left: cl.left,
                  width: cl.width,
                  height: cl.height,
                }}
              >
                {cl.label}
              </div>
            ))
          ))
        }
      </div>
    </div>
  )
}