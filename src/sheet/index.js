import React from 'react';

import useTree from './useTree';

export default function(props) {

  const { rowHeader, colHeader, data } = useTree(props);

  console.log('ddr :', rowHeader, colHeader, data);

  return (
    <div
      className="cs-sheet"
      style={{
        height: 400,
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
                  width: 120,
                  height: 40,
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