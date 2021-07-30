import { STableHeader, STableHeaders } from './';
import { switchNode } from '../util';

// note: for loop faster than forEach;
// https://www.incredible-web.com/blog/performance-of-for-loops-with-javascript/

// BFS traverse;
function falttenTree(tree: STableHeaders): STableHeaders {
  const allNodes = [];
  const queue = [...tree];
  for (let i = 0; queue[i]; i++) {
    allNodes.push(queue[i]);
    queue.push(...queue[i].children);
  }
  return allNodes;
}

type SpanSeq = ['rowSpan', 'colSpan'] | ['colSpan', 'rowSpan'];

type ProcessTreeOpts = {
  calcTop?: number;
  calcLeft?: number;
};

type ProcessTreeRes = {
  flattenRow: STableHeaders[];
  allColumns: STableHeaders;
};

export function processTree(
  columns: STableHeaders = [],
  spanSeq: SpanSeq,
  opts: ProcessTreeOpts,
): ProcessTreeRes {
  let maxLevel = 1;

  const [firstSpan, secondSpan] = spanSeq;

  function traverse(column: STableHeader, parent?: STableHeader) {
    if (parent) {
      if (opts.calcTop) {
        column.top = parent.top + opts.calcTop;
      }
      if (opts.calcLeft) {
        column.left = parent.left + opts.calcLeft;
      }

      column.level = parent.level + 1;
      column.levelInfo = `${parent.levelInfo}.${parent.prop}`;
      column.parent = parent;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 0;
      column.levelInfo = '0';
      if (opts.calcTop) {
        column.top = 0;
      }
      if (opts.calcLeft) {
        column.left = 0;
      }
    }

    if (column.children.length) {
      let span = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        span += subColumn[firstSpan];
      });
      column[firstSpan] = span;
    } else {
      column[firstSpan] = 1;
    }
  }

  columns.forEach((column) => {
    traverse(column);
  });

  const rows: STableHeaders[] = [];
  for (let i = 0; i <= maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = falttenTree(columns);

  allColumns.forEach((column) => {
    if (!column.children.length) {
      column[secondSpan] = maxLevel - column.level + 1;
    } else {
      column[secondSpan] = 1;
    }
    rows[column.level].push(column);
  });

  return {
    flattenRow: rows,
    allColumns,
  };
}

export function getLeafNodes(nodes: STableHeaders = []): STableHeaders {
  const result: STableHeaders = [];
  nodes.forEach((node) => {
    if (node.children && node.children.length) {
      result.push(...getLeafNodes(node.children));
    } else {
      node.isLeaf = true;
      result.push(node);
    }
  });
  return result;
}

export function getDeepestNodePath(
  allNode: STableHeaders = [],
  cellWidth: number,
  cellHeight: number,
): STableHeaders {
  // deepest node
  let dn = allNode[allNode.length - 1];
  const deepestPath = [];
  while (dn) {
    if (!dn.height) {
      dn.height = cellHeight;
    }
    if (!dn.width) {
      dn.width = cellWidth;
    }
    deepestPath.unshift(dn);
    dn = dn.parent;
  }

  return deepestPath;
}

type Measure = 'width' | 'height';

type Offset = 'top' | 'left';

export function calcDeepsetNodePathOffset(deepestPath: STableHeaders, measure: Measure): void {
  const offsetType = measure === 'width' ? 'left' : 'top';
  deepestPath.reduce((acc: number, curr: STableHeader) => {
    curr[offsetType] = acc;
    return acc + (curr[measure] || 0);
  }, 0);
}

export function travelToRootFromLeafNodes(
  leafNodes: STableHeaders,
  measure: Measure,
  defaultValue: number,
  resetMeasure?: boolean,
): void {
  // leaf nodes; Complexity: O(leaf.length * deepest);
  const visitedSet = new Set();

  leafNodes.forEach((node) => {
    node[measure] = node[measure] || defaultValue;

    let parent = node.parent;
    // restet to 0, otherwise the measuer values will accumulation.
    if (resetMeasure) {
      let resetParentRef = node.parent;
      while (resetParentRef && !visitedSet.has(resetParentRef)) {
        // use set to confirm reset once.
        visitedSet.add(resetParentRef);
        resetParentRef[measure] = 0;
        resetParentRef = resetParentRef.parent;
      }
    }

    while (parent) {
      let parentProp = parent[measure] || 0;
      parent[measure] = parentProp + node[measure];
      parent = parent.parent;
    }
  });
}

export function calcNodeOffsetFormFalttenHeader(
  flattenRow: STableHeaders[],
  offset: Offset,
  measure: Measure,
): void {
  for (let row = 0, rowLength = flattenRow.length; row < rowLength; row++) {
    let acc = 0;
    let parentRef;
    for (let col = 0, colLength = flattenRow[row].length; col < colLength; col++) {
      const curr = flattenRow[row][col];

      if (curr.parent && curr.parent !== parentRef) {
        parentRef = curr.parent;
        acc = curr.parent[offset];
      }

      curr[offset] = acc;
      acc += curr[measure] || 0;
    }
  }
}

export function calcMeasureFromDeepestPath(
  allNode: STableHeaders,
  deepestPath: STableHeaders,
  measure: Measure,
): void {
  const offsetType = measure === 'width' ? 'left' : 'top';
  for (let i = 0, iLength = allNode.length; i < iLength; i++) {
    const node = allNode[i];
    const { rowSpan, colSpan, level } = node;
    if (deepestPath.indexOf(allNode[i]) !== -1) continue;
    node[offsetType] = deepestPath[node.level][offsetType];
    allNode[i][measure] = 0;
    for (
      var j = level, jLength = (measure === 'height' ? rowSpan : colSpan) + level;
      j < jLength;
      j++
    ) {
      allNode[i][measure] += deepestPath[j][measure];
    }
  }
}

export function binSearch(scroll: number, arr: any[], measure: Measure): number {
  let start = 0,
    mid = Math.floor(arr.length / 2),
    end = arr.length;

  // if not scroll, return start;
  if (arr.length && arr[0][measure] > scroll) {
    return start;
  }

  const offset = measure === 'width' ? 'left' : 'top';
  while (end - start > 1) {
    if (arr[mid][offset] < scroll) {
      start = mid;
    }
    if (arr[mid][offset] >= scroll) {
      end = mid;
    }
    mid = Math.floor((start + end) / 2);
  }
  return start;
}

type DynHederRes = {
  dynHeaders: STableHeaders;
  dynLeafNodes: STableHeaders;
};
export function getDynHeders(
  startIndex: number,
  leafNodes: STableHeaders,
  measure: Measure,
  measuerLength: number,
): DynHederRes {
  let acc = 0;
  const parentHeaderInView: STableHeaders = [];
  const subLeafNodes = [];

  for (let i = startIndex, l = leafNodes.length; i < l; i++) {
    acc += leafNodes[i][measure];
    subLeafNodes.push(leafNodes[i]);
    if (acc > measuerLength) {
      // add 1 more node to prevent empty;
      const nextIndex = i + 1;
      leafNodes[nextIndex] && subLeafNodes.push(leafNodes[nextIndex]);
      break;
    }
  }

  const ws = new WeakSet();
  subLeafNodes.forEach((n) => {
    while (n.parent && !ws.has(n.parent)) {
      parentHeaderInView.push(n.parent);
      ws.add(n.parent);
    }
  });

  return {
    dynHeaders: [...parentHeaderInView, ...subLeafNodes],
    dynLeafNodes: subLeafNodes,
  };
}

// get the last child
export function getLastNode(node: STableHeader): STableHeader {
  let tn = node;
  while (tn && tn.children.length) {
    const l = tn.children.length;
    tn = tn.children[l - 1];
  }
  return tn;
}

export function getNodeByProp(rawHeader: STableHeaders, prop: string): STableHeader | null {
  let foundNode = null;
  const recursion = (node: STableHeader) => {
    if (node.prop === prop) {
      foundNode = node;
      return true;
    }
    node.children &&
      node.children.forEach((cn) => {
        recursion(cn);
      });
  };

  for (let i = 0, l = rawHeader.length; i < l; i++) {
    if (recursion(rawHeader[i])) break;
  }

  return foundNode;
}

export function switchPosByProps(
  rawHeader: STableHeaders,
  firstProp: string,
  secondProp: string,
): boolean {
  const firstNode = getNodeByProp(rawHeader, firstProp),
    secondNode = getNodeByProp(rawHeader, secondProp);

  if (!firstNode || !secondNode) {
    console.warn('Can not find node.');
    return false;
  }

  if (firstNode.parent !== secondNode.parent) {
    console.warn('Can not switch nodes, because it has diff parent.');
    return false;
  }

  if (!firstNode.parent) {
    const fIndex = rawHeader.indexOf(firstNode);
    const sIndex = rawHeader.indexOf(secondNode);
    switchNode(rawHeader, fIndex, sIndex);
  } else {
    const nodes = firstNode.parent.children;
    const fIndex = nodes.indexOf(firstNode);
    const sIndex = nodes.indexOf(secondNode);
    switchNode(nodes, fIndex, sIndex);
  }
  return true;
}
