let scrollBarWidth: number;
export function getScrollBarWidth(): number {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  const dom = document.createElement('div');
  const body = document.body || dom;

  dom.style.visibility = 'hidden';
  dom.style.width = '100px';
  dom.style.position = 'absolute';
  dom.style.top = '-9999px';
  dom.style.overflow = 'scroll';

  body.appendChild(dom);

  const totalWidth: number = dom.offsetWidth;
  const widthWithoutScroll: number = dom.clientWidth;

  body.removeChild(dom);

  return totalWidth - widthWithoutScroll;
}

export function switchNode(nodes: any[], fIndex: number, sIndex: number): void {
  const t = nodes[fIndex];
  nodes[fIndex] = nodes[sIndex];
  nodes[sIndex] = t;
}
