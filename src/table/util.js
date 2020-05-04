let scrollBarWidth;
export function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const dom = document.createElement('div');
  const body = document.body || dom;

  dom.style.visibility = 'hidden';
  dom.style.width = '100px';
  dom.style.position = 'absolute';
  dom.style.top = '-9999px';
  dom.style.overflow = 'scroll';

  body.appendChild(dom);

  const totalWidth = dom.offsetWidth;
  const widthWithoutScroll = dom.clientWidth;

  body.removeChild(dom);

  return totalWidth - widthWithoutScroll;
}

export function processHeaderWidth (header, defaultCellWidth)  {
  header.reduce((acc, curr) => {
    curr.left = acc;
    return (curr.width || defaultCellWidth) + acc;
  }, 0);
  return header;
}

export function getMutableIndexAndCount(header, scrollWidth, dataAreaWidth, defaultCellWidth) {
  let accWidth = 0,
      startIndex = 0,
      endIndex = header.length - 1;
  const totalWidth = scrollWidth + dataAreaWidth
  for(let i = 0; i < header.length; i++) {
    accWidth += (header[i].width) || defaultCellWidth;
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
    count: (endIndex - startIndex) + 1
  };
}
