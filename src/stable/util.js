import { switchNode } from '../util';

// note: for loop faster than forEach;
// https://www.incredible-web.com/blog/performance-of-for-loops-with-javascript/

// BFS traverse;
function falttenTree(tree) {
  const allNodes = [];
  const queue = [...tree];
  for (let i = 0; queue[i]; i++) {
    allNodes.push(queue[i]);
    queue.push(...queue[i].children);
  }
  return allNodes;
}

export function processTree(columns = [], spanSeq, opts) {
  let maxLevel = 1;

  const [firstSpan, secondSpan] = spanSeq;

  function traverse(column, parent) {
    if (parent) {
      if (opts.calcTop) {
        column.top = parent.top + opts.calcTop;
      }
      if (opts.calcLeft) {
        column.left = parent.left + opts.calcLeft;
      }

      column.level = parent.level + 1;
      column.parent = parent;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 0;
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

  const rows = [];
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

export function getLeafNodes(nodes = []) {
  const result = [];
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

export function getDeepestNodePath(allNode = [], cellWidth, cellHeight) {
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

export function calcDeepsetNodePathOffset(deepestPath, measure) {
  const offsetType = measure === 'width' ? 'left' : 'top';
  deepestPath.reduce((acc, curr) => {
    curr[offsetType] = acc;
    return acc + curr[measure];
  }, 0);
}

export function travelToRootFromLeafNodes(leafNodes, prop, defaultValue) {
  // leaf nodes; Complexity: O(leaf.length * deepest);
  const set = new Set();
  leafNodes.forEach((node) => {
    node[prop] = node[prop] || defaultValue;
    let accValue = node[prop];
    let parent = node.parent;

    // reset measure, when rebuild tree, this value incorrect
    if (parent && !set.has(parent)) {
      parent[prop] = 0;
      set.add(parent);
    }

    while (parent) {
      let parentProp = parent[prop] || 0;
      parent[prop] = parentProp + accValue;
      accValue = parentProp + accValue;
      parent = parent.parent;
    }
  });
}

export function calcNodeOffsetFormFalttenHeader(flattenRow, prop, measure) {
  for (let i = 0, iLength = flattenRow.length; i < iLength; i++) {
    let acc = 0;
    for (let j = 0, jLength = flattenRow[i].length; j < jLength; j++) {
      const curr = flattenRow[i][j];

      acc = acc === 0 ? (curr.parent ? curr.parent[prop] : 0) : acc;

      curr[prop] = acc;
      acc += curr[measure];
    }
  }
}

export function calcMeasureFromDeepestPath(allNode, deepestPath, measure) {
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

export function binSearch(scroll, arr, measure) {
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

export function getSubTreeFromStartNode(startIndex, leafNodes, measure, measuerLength) {
  let acc = 0;
  const parentHeaderInView = [];
  const subLeafNode = [];

  for (let i = startIndex, l = leafNodes.length; i < l; i++) {
    acc += leafNodes[i][measure];
    subLeafNode.push(leafNodes[i]);
    if (acc > measuerLength) {
      // add 1 more node to prevent empty;
      const nextIndex = i + 1;
      leafNodes[nextIndex] && subLeafNode.push(leafNodes[nextIndex]);
      break;
    }
  }

  const ws = new WeakSet();
  subLeafNode.forEach((n) => {
    while (n.parent && !ws.has(n.parent)) {
      parentHeaderInView.push(n.parent);
      ws.add(n.parent);
    }
  });

  return [...parentHeaderInView, ...subLeafNode];
}

// get the last child
export function getLastNode(node) {
  let tn = node;
  while (tn && tn.children.length) {
    const l = tn.children.length;
    tn = tn.children[l - 1];
  }
  return tn;
}

export function getNodeByProp(rawHeader, prop) {
  let foundNode = null;
  const recursion = (node) => {
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

export function switchPosByProps(rawHeader, firstProp, secondProp) {
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
