export type RefDOM = LegacyRef<HTMLDivElement> | undefined;

export type Header = {
  label: string;
  prop: string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
};

export type DataCell = {
  [key]: string;
};


export type defalCellRenderer = (
  record: any,
  rowIndex: number,
  prop: string,
  header: CTableHeader,
) => CTableDataItem;

export type defalHeaderRenderer = (header: CTableHeader, prop: string) => string;
