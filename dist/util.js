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