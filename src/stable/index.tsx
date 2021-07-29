import React, { useRef, useCallback, useState, LegacyRef } from 'react';
import t from 'prop-types';
import useColHeader from './useColHeader';
import useRowHeader from './useRowHeader';
import { getSubTreeFromStartNode, binSearch } from './util';
import ColHeader from './ColHeader';
import RowHeader from './RowHeader';
import useUpdateEffect from '../hooks/useUpdateEffect';

export type RefDOM = LegacyRef<HTMLDivElement> | undefined;

export type STableHeader = {
  prop: string;
  label: string;
  level: number;
  left: number;
  levelInfo: string;
  top: number;
  rowSpan: number;
  colSpan: number;
  children: STableHeader[];
  parent: STableHeader;
  isLeaf: boolean;
  height: number;
  width: number;
};

export type STableHeaders = STableHeader[];

type STableDataItem = { [colProp: string]: any };
type STableData = {
  [rowProp: string]: STableDataItem;
};

type defalCellRenderer = (
  record: any,
  rowProp: string,
  colProp: string,
  data: STableDataItem,
) => STableDataItem;

export interface STableProps {
  colHeader: STableHeaders;
  rowHeader: STableHeaders;
  data: STableData;
  height: number;
  width: number;
  cellHeight: number;
  cellWidth: number;
  renderCell: defalCellRenderer;
  enableColResize: boolean;
  enableRowResize: boolean;
  enableColSorting: boolean;
  enableRowSorting: boolean;
}

function STable(props: STableProps): JSX.Element {
  const {
    colHeader,
    rowHeader,
    data,
    height = 400,
    width = 1000,
    cellHeight = 40,
    cellWidth = 100,
    renderCell = (record, rowProp, colProp, data) => record,
    enableColResize = false,
    enableRowResize = false,
    enableColSorting = false,
    enableRowSorting = false,
  } = props;

  const {
    colHeaderWidth,
    colHeaderHeight,
    colHeaderLeaf,
    colDeepestPath,
    rebuildColHeader,
    handleColSort,
  } = useColHeader({ colHeader, cellWidth, cellHeight });

  const {
    rowHeaderWidth,
    rowHeaderHeight,
    rowHeaderLeaf,
    rowDeepestPath,
    rebuildRowHeader,
    handleRowSort,
  } = useRowHeader({ rowHeader, cellWidth, cellHeight });

  const sTableRef = useRef<HTMLDivElement>(null);
  const dataAreaRef = useRef<HTMLDivElement>(null);
  const rowHeaderRef = useRef<HTMLDivElement>(null);
  const colHeaderRef = useRef<HTMLDivElement>(null);
  const colResizeProxyRef = useRef<HTMLDivElement>(null);
  const rowResizeProxyRef = useRef<HTMLDivElement>(null);

  // component state
  const [{ dynColHeader, dynRowHeader }, setState] = useState(() => {
    return {
      dynColHeader: getSubTreeFromStartNode(0, colHeaderLeaf, 'width', width),
      dynRowHeader: getSubTreeFromStartNode(0, rowHeaderLeaf, 'height', height),
    };
  });

  const cacheRef = useRef({
    colIndexCache: 0,
    rowIndexCache: 0,
  });

  // cache index, No need 'throttle' for the moment.
  const handleScroll = useCallback(
    (e) => {
      const target = e.currentTarget;
      if (!target) return;
      const { scrollTop, scrollLeft, clientHeight, clientWidth } = target;
      colHeaderRef.current!.scrollLeft = scrollLeft;
      rowHeaderRef.current!.scrollTop = scrollTop;

      const { colIndexCache, rowIndexCache } = cacheRef.current;

      const currColIndex = binSearch(scrollLeft, colHeaderLeaf, 'width');
      const currRowIndex = binSearch(scrollTop, rowHeaderLeaf, 'height');

      // if stay on same cell, do not rerender table.
      if (colIndexCache === currColIndex && rowIndexCache === currRowIndex) return;

      let newCol: STableHeaders;
      if (colIndexCache !== currColIndex) {
        // todo get sub tree;
        newCol = getSubTreeFromStartNode(currColIndex, colHeaderLeaf, 'width', clientWidth);
        cacheRef.current.colIndexCache = currColIndex;
      }

      let newRow: STableHeaders;
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
    },
    [setState, colHeaderLeaf, rowHeaderLeaf],
  );

  // sorting effect.
  useUpdateEffect(() => {
    const { colIndexCache, rowIndexCache } = cacheRef.current;
    const newCol = getSubTreeFromStartNode(colIndexCache, colHeaderLeaf, 'width', width);
    const newRow = getSubTreeFromStartNode(rowIndexCache, rowHeaderLeaf, 'height', height);
    setState((pre) => {
      return {
        dynColHeader: newCol ? newCol : pre.dynColHeader,
        dynRowHeader: newRow ? newRow : pre.dynRowHeader,
      };
    });
  }, [colHeaderLeaf, rowHeaderLeaf, width, height]);

  return (
    <div
      className="s-table"
      style={{
        height,
        position: 'relative',
      }}
      ref={sTableRef}
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
        className="s-table-col-header"
        style={{
          marginLeft: rowHeaderWidth,
          overflow: 'hidden',
        }}
        ref={colHeaderRef}
      >
        <ColHeader
          dynColHeader={dynColHeader}
          colDeepestPath={colDeepestPath}
          colHeaderHeight={colHeaderHeight}
          colHeaderWidth={colHeaderWidth}
          containerRef={sTableRef}
          colResizeProxyRef={colResizeProxyRef}
          rowResizeProxyRef={rowResizeProxyRef}
          enableColResize={enableColResize}
          enableRowResize={enableRowResize}
          enableColSorting={enableColSorting}
          onUpdate={rebuildColHeader}
          handleColSort={handleColSort}
        />
      </div>

      <div
        className="s-table-row-header"
        style={{
          overflow: 'hidden',
          height: height - colHeaderHeight,
          // marginTop: colHeaderHeight,
        }}
        ref={rowHeaderRef}
      >
        <RowHeader
          dynRowHeader={dynRowHeader}
          rowDeepestPath={rowDeepestPath}
          rowHeaderHeight={rowHeaderHeight}
          rowHeaderWidth={rowHeaderWidth}
          containerRef={sTableRef}
          colResizeProxyRef={colResizeProxyRef}
          rowResizeProxyRef={rowResizeProxyRef}
          enableColResize={enableColResize}
          enableRowResize={enableRowResize}
          enableRowSorting={enableRowSorting}
          onUpdate={rebuildRowHeader}
          handleRowSort={handleRowSort}
        />
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
          {rowHeaderLeaf.map((row, rowIndex) =>
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
                {renderCell(data[row.prop][col.prop], row.prop, col.prop, data)}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="resize-col-proxy" ref={colResizeProxyRef} style={{ visibility: 'hidden' }} />
      <div className="resize-row-proxy" ref={rowResizeProxyRef} style={{ visibility: 'hidden' }} />
    </div>
  );
}

STable.displayName = 'STable';

STable.propTypes = {
  /**
   * 列表头，树结构
   * [{ label: '2018', prop: '2018', children: []}, ...]
   */
  colHeader: t.array.isRequired,
  /**
   * 行表头，树结构
   * [{ label: '广东', prop: 'gd', children: []}, ...]
   */
  rowHeader: t.array.isRequired,
  /**
   * 对象，key 分别对应 行列表头
   * {
   *    "gd": {
   *      "2018": value,
   *    }
   * }
   */
  data: t.object.isRequired,
  /**
   * 表格高度
   */
  height: t.number,
  /**
   * 表格宽度
   */
  width: t.number,
  /**
   * 单元格宽度
   */
  cellWidth: t.number,
  /**
   * 单元格高度
   */
  cellHeight: t.number,
  /**
   * 自定义渲染单元格
   * (record, rowProp, colProp, data) => record
   */
  renderCell: t.func,
  /**
   * 开启调整列宽度
   */
  enableColResize: t.bool,
  // enableRowResize: t.bool,

  /**
   * 开启调整列顺序
   */
  enableColSorting: t.bool,
  /**
   * 开启调整行顺序
   */
  enableRowSorting: t.bool,
};

STable.defaultProps = {
  height: 400,
  width: 800,
  cellHeight: 40,
  cellWidth: 100,
  renderCell: (record: any, rowProp: any, colProp: any, data: any) => record,
  enableColResize: false,
  enableRowResize: false,
  enableColSorting: false,
  enableRowSorting: false,
};

export default STable;
