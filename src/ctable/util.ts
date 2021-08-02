import { CTableHeader } from './';
type MutableIndexAndCount = {
  startIndex: number;
  count: number;
};

type ProcessHeaderWidthRes = {
  totalWidth: number;
  headers: CTableHeader[];
};
export function processHeaderWidth(
  headers: CTableHeader[],
  defaultCellWidth: number,
): ProcessHeaderWidthRes {
  const totalWidth = headers.reduce((acc: number, curr: CTableHeader) => {
    curr.left = acc;
    const accWidth = (curr.width || defaultCellWidth) + acc;
    return accWidth;
  }, 0);
  return { headers, totalWidth };
}

export function getMutableIndexAndCount(
  header: CTableHeader[],
  scrollWidth: number,
  dataAreaWidth: number,
  defaultCellWidth: number,
): MutableIndexAndCount {
  let accWidth = 0,
    startIndex = 0,
    endIndex = header.length - 1;
  const totalWidth = scrollWidth + dataAreaWidth;
  for (let i = 0; i < header.length; i++) {
    accWidth += header[i].width || defaultCellWidth;
    if (accWidth < scrollWidth) {
      startIndex = i;
    }
    if (accWidth > totalWidth) {
      endIndex = i;
      break;
    }
  }
  return {
    startIndex,
    count: endIndex - startIndex + 1,
  };
}
