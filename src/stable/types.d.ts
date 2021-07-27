type STableHeader = {
  prop: string;
  label: string;
  level: number;
  left: number;
  top: number;
  rowSpan: number;
  colSpan: number;
  children: STableHeader[];
  parent: STableHeader;
  isLeaf: boolean;
  height: number;
  width: number;
};

type STableHeaders = STableHeader[];

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

interface STableProps {
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

interface ColHeaderProps {
  dynColHeader: STableHeaders;
  colHeaderWidth: number;
  colHeaderHeight: number;
  enableColResize: boolean;
  enableRowResize: boolean;
  enableColSorting: boolean;
  containerRef: RefDOM;
  colResizeProxyRef: RefDOM;
  onUpdate: Function;
  handleColSort: Function;
}

interface RowHeaderProps {
  dynRowHeader: STableHeaders;
  rowHeaderWidth: number;
  rowHeaderHeight: number;
  rowDeepestPath: STableHeaders;
  enableColResize: boolean;
  enableRowResize: boolean;
  containerRef: RefDOM;
  colResizeProxyRef: RefDOM;
  onUpdate: Function;
  handleRowSort: Function;
  enableRowSorting: boolean;
}

type UseRowHeaderParams = {
  rowHeader: STableHeaders;
  cellWidth: number;
  cellHeight: number;
};

type UseColHeaderParams = {
  colHeader: STableHeaders;
  cellWidth: number;
  cellHeight: number;
};
