import React, { useRef, useCallback, useState } from 'react';

import useColHeader from './useColHeader';
import useRowHeader from './useRowHeader';
import { getSubTreeFromStartNode, binSearch } from './util';
import { getScrollBarWidth } from '../table/util';

export default function(props) {

  const {
    colHeader,
    rowHeader,
    data,
    height = 400,
    width = 800,
    renderCell  = (record, rowProp, colProp, data) => record,
  } = props;

  const {
    colHeaderWidth,
    colHeaderHeight,
    colHeaderLeaf,
  } = useColHeader(props.colHeader);

  const {
    rowHeaderWidth,
    rowHeaderHeight,
    rowHeaderLeaf,
  } = useRowHeader(props.rowHeader);

  const dataAreaRef = useRef();
  const rowHeaderRef = useRef();
  const colHeaderRef = useRef();

  // component state
  const [{dynColHeader, dynRowHeader}, setState] = useState(() => {
    return {
      dynColHeader: getSubTreeFromStartNode(0, colHeaderLeaf,  'width', width),
      dynRowHeader: getSubTreeFromStartNode(0, rowHeaderLeaf, 'height', height),
    };
  });

  const cacheRef = useRef({
    colIndexCache: 0,
    rowIndexCache: 0,
  });

  // cache index, No need 'throttle' for the moment.
  const handleScroll = useCallback((e) => {
    const target = e.currentTarget;
    if (!target) return;
    const { scrollTop, scrollLeft, clientHeight, clientWidth } = target;
    colHeaderRef.current.scrollLeft = scrollLeft;
    rowHeaderRef.current.scrollTop = scrollTop;

    const { colIndexCache, rowIndexCache } = cacheRef.current;

    const currColIndex = binSearch(scrollLeft, colHeaderLeaf, 'width');
    const currRowIndex = binSearch(scrollTop, rowHeaderLeaf, 'height');

    // if stay on same cell, do not rerender table.
    if (colIndexCache === currColIndex && rowIndexCache === currRowIndex) return;

    let newCol;
    if (colIndexCache !== currColIndex) {
      // todo get sub tree;
      newCol = getSubTreeFromStartNode(currColIndex, colHeaderLeaf,  'width', clientWidth);
      cacheRef.current.colIndexCache = currColIndex;
    }

    let newRow;
    if (rowIndexCache !== currRowIndex) {
      // todo get sub tree;
      newRow = getSubTreeFromStartNode(currRowIndex, rowHeaderLeaf, 'height', clientHeight);
      cacheRef.current.rowIndexCache = currRowIndex;
    }

    setState((pre) => {
      return {
        dynColHeader: newCol ? newCol : pre.dynColHeader,
        dynRowHeader: newRow ? newRow : pre.dynRowHeader,
      };
    });
    
  }, [setState]);

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
          dynColHeader.map(({top, left, width, height, label, prop}) => (
            <div
              className="header"
              key={prop}
              style={{
                position: 'absolute',
                top: top,
                left: left,
                width: width,
                height: height,
              }}
            >
              {label}
            </div>
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
            dynRowHeader.map( ({top, left, width, height, label, prop}) => (
              <div
                className="header"
                key={prop}
                style={{
                  position: 'absolute',
                  top: top,
                  left: left,
                  width: width,
                  height: height,
                }}
              >
                {label}
              </div>
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
            rowHeaderLeaf.map((row, rowIndex) => (
              colHeaderLeaf.map((col, colIndex) => (
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
                  {
                    renderCell(data[row.prop][col.prop], row.prop, col.prop, data)
                  }
                </div>
              ))
            ))
          }
        </div>
      </div>

    </div>
  )
}