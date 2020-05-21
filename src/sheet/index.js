import React, { useRef, useCallback } from 'react';

import useColHeader from './useColHeader';
import useRowHeader from './useRowHeader';
import { getSubTreeFromStartNode, binSearch } from './util';
import { getScrollBarWidth } from '../table/util';

export default function(props) {

  const { height = 400 } = props;

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

  const dataAreaRef = useRef();
  const rowHeaderRef = useRef();
  const colHeaderRef = useRef();

  const cacheRef = useRef({
    colIndexCache: 0,
    rowIndexCache: 0,
  });

  const handleScroll = useCallback((e) => {
    const target = e.currentTarget;
    if (!target) return;
    const { scrollTop, scrollLeft } = target;
    colHeaderRef.current.scrollLeft = scrollLeft;
    rowHeaderRef.current.scrollTop = scrollTop;

    const { colIndexCache, rowIndexCache } = cacheRef.current;

    const currColIndex = binSearch(scrollLeft, colHeaderLeaf, 'width');
    if (colIndexCache !== currColIndex) {
      // todo get sub tree;
      // getSubTreeFromStartNode(scrollLeft, colHeaderLeaf, 800, 'left');
    }

    const currRowIndex = binSearch(scrollTop, rowHeaderLeaf, 'height');
    if (rowIndexCache !== currRowIndex) {
      // todo get sub tree;
      // getSubTreeFromStartNode(scrollTop, rowHeaderLeaf, 800, 'top');
    }

    
    
  }, []);

  console.log(colHeader);

  return (
    <div
      className="cs-sheet"
      style={{
        height,
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
          overflow: 'hidden',
        }}
        ref={colHeaderRef}
      >
        <div
          style={{
            position: 'relative',
            height: colHeaderHeight,
            width: colHeaderWidth + getScrollBarWidth(),
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
      </div>

      <div className="cs-sheet-row-header"
        style={{
          overflow: 'hidden',
          height: height - colHeaderHeight,
          // marginTop: colHeaderHeight,
        }}
        ref={rowHeaderRef}
      >
        <div
          style={{
            position: 'relative',
            width: rowHeaderWidth,
            height: rowHeaderHeight + getScrollBarWidth(),
          }}
        >
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
        onScroll={handleScroll}
        ref={dataAreaRef}
      >
        <div
          style={{
            width: colHeaderWidth,
            height: rowHeaderHeight,
          }}
        >
          {
            colHeaderLeaf.map((col, colIndex) => (
              rowHeaderLeaf.map((row, rowIndex) => (
                <div
                  className="cell"
                  key={`d-a-${rowIndex}-${colIndex}`}
                  style={{
                    position: 'absolute',
                    width: col.width,
                    height: row.height,
                    left: col.left,
                    top: row.top,
                  }}
                >
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