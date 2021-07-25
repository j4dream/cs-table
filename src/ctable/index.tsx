import React, { useRef, useState, useCallback, useMemo, FC } from 'react';
import t from 'prop-types';
import CTable from './CTable';
import { getScrollBarWidth } from '../util';
import { processHeaderWidth, getMutableIndexAndCount } from './util';
import { switchNode } from '../util';
import useUpdateEffect from '../hooks/useUpdateEffect';

type CTableHeader = {
  label: string;
  prop: string;
};

type CTableDataItem = {
  [prop: string]: string;
};

type CTableData = CTableDataItem[];
type CTableHeaders = CTableHeader[];

interface CTableInterface {
  header: CTableHeaders;
  data: CTableData;
  height: number;
  cellWidth: number;
  cellHeight: number;
  preventScroll: boolean;
  enableResize: boolean;
  enableSorting: false;
  keepScrollStatus?: false;
  renderCell: (record: CTableDataItem, rowIndex: number, prop: string) => string;
  renderHeader: (header: CTableHeader, prop: string) => string;
}

const CTableContext = React.createContext<CTableInterface>({});

const getRangeFromArr = (arr: any[], start: number, count: number): any[] => {
  const res = [];
  for (let i = 0; i <= count; i++) {
    const record = arr[start + i];
    record && res.push(record);
  }
  return res;
};

const Provider: FC<CTableInterface> = (props) => {
  const {
    header,
    data,
    height = 440,
    cellWidth = 120,
    cellHeight = 40,
    renderCell = (record, rowIndex, prop) => record,
    renderHeader = (header, prop) => header.label,
    children,
    preventScroll = false,
    enableResize = false,
    enableSorting = false,
    keepScrollStatus = false,
    ...restProps
  } = props;

  const dataAreaRef = useRef();
  const headerRef = useRef();
  const fixedColLeftRef = useRef();
  const scrollBarRef = useRef(getScrollBarWidth());
  const colResizeProxyRef = useRef();
  const tableRef = useRef();

  const restHeader = useMemo(
    () =>
      processHeaderWidth(
        header.filter((h) => !h.fixed),
        cellWidth,
      ).headers,
    [header, cellWidth],
  );
  const fixedLeft = useMemo(
    () =>
      processHeaderWidth(
        header.filter((h) => h.fixed),
        cellWidth,
      ).headers,
    [header, cellWidth],
  );

  // design for some fixed element, when data scroll, it has position offset;
  // eg: datepicker, multi select in cell.
  const preventScrollRef = useRef<boolean>(preventScroll);
  preventScrollRef.current = preventScroll;

  // caculate fixed col width.
  const fixedLeftColWidth = useMemo(() => {
    return fixedLeft.reduce((acc, curr) => acc + (curr.width || cellWidth), 0);
  }, [fixedLeft, cellWidth]);

  const initWidthCountRef = useRef(
    Math.ceil(
      (typeof document === 'undefined' ? 0 : document.body.offsetWidth - fixedLeftColWidth) /
        cellWidth,
    ),
  );
  const initHeightCountRef = useRef(Math.ceil(height / cellHeight));

  const [dataAreaState, setDataAreaState] = useState(() => ({
    processedHeader: getRangeFromArr(restHeader, 0, initWidthCountRef.current),
    processedData: getRangeFromArr(data, 0, initHeightCountRef.current),
    fixedLeftCol: fixedLeft,
    rowStartIndex: 0,
    colStartIndex: 0,
  }));

  // when data update, scroll to other pos, need to cache prev pos;
  const scrollStatusCacheRef = useRef({
    colIndex: 0,
    rowIndex: 0,
    scrollTop: 0,
    colCount: initWidthCountRef.current,
    rowCount: initHeightCountRef.current,
  });

  // props update
  useUpdateEffect(() => {
    setDataAreaState((preState) => {
      const {
        processedData: preData,
        processedHeader: preHeader,
        fixedLeftCol: preFixedLeftCol,
      } = preState;

      const { colIndex, rowIndex, colCount, rowCount, scrollTop } = scrollStatusCacheRef.current;

      if (preData !== data) {
        preState.processedData = getRangeFromArr(
          data,
          keepScrollStatus ? rowIndex : 0,
          rowCount || initHeightCountRef.current,
        );
      }

      if (preHeader !== header) {
        preState.processedHeader = getRangeFromArr(
          restHeader,
          keepScrollStatus ? colIndex : 0,
          colCount || initWidthCountRef.current,
        );
      }

      if (preFixedLeftCol !== fixedLeft) {
        preState.fixedLeftCol = fixedLeft;
      }

      if (keepScrollStatus) {
        fixedColLeftRef.current && fixedColLeftRef.current.scrollTo(0, scrollTop);
      } else {
        dataAreaRef.current && dataAreaRef.current.scrollTo(0, 0);
        fixedColLeftRef.current && fixedColLeftRef.current.scrollTo(0, 0);
      }

      return {
        ...preState,
      };
    });
  }, [data, restHeader, fixedLeft, keepScrollStatus]);

  const handleSorting = useCallback(
    (firstProp, secondProp) => {
      const fHeader = restHeader.find((item) => item.prop === firstProp);
      const sHeader = restHeader.find((item) => item.prop === secondProp);
      switchNode(restHeader, restHeader.indexOf(fHeader), restHeader.indexOf(sHeader));
      processHeaderWidth(restHeader, cellWidth);
      setDataAreaState((pre) => {
        const { colIndex, colCount } = scrollStatusCacheRef.current;
        const processedHeader = getRangeFromArr(restHeader, colIndex, colCount);
        return {
          ...pre,
          processedHeader,
        };
      });
    },
    [restHeader, cellWidth],
  );

  // cache index, No need 'throttle' for the moment.
  const handleScroll = useCallback(
    (e) => {
      const cellTarget = e.currentTarget;
      if (!cellTarget) return;
      const {
        scrollLeft: sLeft,
        scrollTop: sTop,
        offsetWidth: oWidth,
        offsetHeight: oHeight,
      } = cellTarget;

      let colStartIndex, colRenderCount;
      if (enableResize) {
        const { startIndex, count } = getMutableIndexAndCount(
          restHeader,
          sLeft,
          dataAreaRef.current.offsetWidth,
          cellWidth,
        );
        colStartIndex = startIndex;
        colRenderCount = count;
      } else {
        colStartIndex = Math.floor(sLeft / cellWidth);
        colRenderCount = Math.ceil(oWidth / cellWidth);
      }

      const rowStartIndex = Math.floor(sTop / cellHeight),
        rowRenderCount = Math.ceil(oHeight / cellHeight);

      if (headerRef.current) {
        headerRef.current.scrollLeft = sLeft;
      }

      if (fixedColLeftRef.current) {
        fixedColLeftRef.current.scrollTop = sTop;
      }

      const scrollStatus = scrollStatusCacheRef.current;

      // if stay on same cell, do not rerender table.
      if (scrollStatus.colIndex === colStartIndex && scrollStatus.rowIndex === rowStartIndex)
        return;
      // assign new pos.
      scrollStatus.colIndex = colStartIndex;
      scrollStatus.rowIndex = rowStartIndex;
      scrollStatus.colCount = colRenderCount;
      scrollStatus.rowCount = rowRenderCount;
      scrollStatus.scrollTop = sTop;

      const processedHeader = getRangeFromArr(restHeader, colStartIndex, colRenderCount);
      const processedData = getRangeFromArr(data, rowStartIndex, rowRenderCount);

      setDataAreaState((prevState) => ({
        ...prevState,
        processedHeader,
        processedData,
        colStartIndex,
        rowStartIndex,
      }));
    },
    [restHeader, data, cellWidth, cellHeight, dataAreaRef, enableResize],
  );

  const editorContext = {
    header: restHeader,
    data,
    // width,
    height,
    scrollBarWidth: scrollBarRef.current,
    cellWidth,
    cellHeight,
    dataAreaRef,
    headerRef,
    fixedColLeftRef,
    colResizeProxyRef,
    tableRef,
    handleScroll,
    dataAreaState,
    fixedLeftColWidth,
    setDataAreaState,
    preventScroll: preventScrollRef.current,
    renderCell,
    renderHeader,
    enableResize,
    enableSorting,
    handleSorting,
    ...restProps,
  };

  return <CTableContext.Provider value={editorContext}>{children}</CTableContext.Provider>;
};

function CTableProvider(props: any) {
  return (
    <Provider {...props}>
      <CTable />
    </Provider>
  );
}

CTableProvider.propTypes = {
  /**
   *  数组 [], 元素应包含 label，prop
   *  例如： { prop: 'name', label: 'Name' }
   */
  header: t.array.isRequired,
  /**
   *  数组 [], 元素 key 应该对应 header 中的 prop;
   *  例如： { name: 'DC' }
   */
  data: t.array.isRequired,
  /**
   *  Table 高度
   */
  height: t.number,
  /**
   *  Cell 单元格宽度
   */
  cellWidth: t.number,
  /**
   *  Cell 单元格高度
   */
  cellHeight: t.number,
  /**
   *  防止表格滚动，当你在做一个编辑表格的时候，这可以避免定位错误问题。
   */
  preventScroll: t.bool,
  /**
   *  调整宽度
   */
  enableResize: t.bool,
  /**
   *  调整顺序
   */
  enableSorting: t.bool,
  /**
   *  数据更新时候，是否保留滚动状态。如果 header 同时更新，建议关闭。
   */
  keepScrollStatus: t.bool,
  /**
   *  自定义渲染单元格
   *  (record, rowIndex, prop) => record
   */
  renderCell: t.func,
  /**
   *  自定义渲染表头单元格
   *  (header, prop) => header.label
   */
  renderHeader: t.func,
};

CTableProvider.defaultProps = {
  height: 440,
  cellWidth: 120,
  cellHeight: 40,
  preventScroll: false,
  enableResize: false,
  enableSorting: false,
  keepScrollStatus: false,
  renderCell: (record: CTableDataItem, rowIndex: number, prop: string) => record,
  renderHeader: (header: CTableHeader, prop: string) => header.label,
};

export default CTableProvider;
export { CTableContext };
