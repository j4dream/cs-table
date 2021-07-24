type Header = {
  left: number;
  width: number;
};

type MutableIndexAndCount = {
  startIndex: number;
  count: number;
};

export function processHeaderWidth(
  headers: Header[],
  defaultCellWidth: number,
  returnTotalWidth = false,
): Header[] | number {
  const totalWidth = headers.reduce((acc: number, curr: Header) => {
    curr.left = acc;
    const accWidth = (curr.width || defaultCellWidth) + acc;
    return accWidth;
  }, 0);

  if (returnTotalWidth) {
    return totalWidth;
  }
  return headers;
}

export function getMutableIndexAndCount(
  header: Header[],
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
