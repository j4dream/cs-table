import React, { useEffect, useState } from 'react';

import useColHeader from './useColHeader';
import useRowHeader from './useRowHeader';

export default function(props) {

  const {
    header: colHeader,
    colHeaderWidth,
    colHeaderHeight,
    colHeaderLeaf,
  } = useColHeader(props.colHeader);

  const {
    header: rowHeader,
    rowHeaderWidth,
    rowHeaderHeight,
    rowHeaderLeaf,
  } = useRowHeader(props.rowHeader);

  // const [, forceUpdate] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     forceUpdate(e => e + 1);
  //   }, 3000);
  // }, []);

  return (
    <div
      className="cs-sheet"
      style={{
        height: 400,
        position: 'relative',
      }}
    >

      <div
        className="corner"
        style={{
          height: colHeaderHeight,
          width: rowHeaderWidth,
          position: 'absolute',
        }}
      />

      <div
        className="cs-sheet-col-header"
        style={{
          marginLeft: rowHeaderWidth,
          position: 'relative',
        }}
      >
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
          marginTop: colHeaderHeight,
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

      <div
        style={{
          position: 'absolute',
          top: colHeaderHeight,
          left: rowHeaderWidth,
          bottom: 0,
          right: 0,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: colHeaderWidth,
            height: rowHeaderHeight,
          }}
        >
          {
            colHeaderLeaf.map(col => (
              rowHeaderLeaf.map((row) => (
                <div>
                  cell
                </div>
              ))
            ))
          }
        </div>
      </div>

    </div>
  )
}