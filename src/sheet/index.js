import React from 'react';

import useTree from './useTree';
import useRowHeader from './useRowHeader';

export default function(props) {

  const { header: colHeader } = useTree(props.colHeader);
  const { header: rowHeader } = useRowHeader(props.rowHeader);

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

      <div
        style={{
          position: 'relative',
          marginTop: 80,
        }}
      >
        <div className="cs-sheet-col-header">
          {
            rowHeader.map( cls => (
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

    </div>
  )
}