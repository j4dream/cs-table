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

export function precessTree(columns = [], spanSeq, opts) {

  console.log('process tree');
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
  console.log('getLeafNodes');
  const result = [];
  nodes.forEach((node) => {
    if (node.children && node.children.length) {
      result.push(...getLeafNodes(node.children));
    } else {
      result.push(node);
    }
  });
  return result;
}

export function getDeepestNodePath(allNode = []) {
  // deepest node
  console.log('getDeepestNodePath');
  let dn = allNode[allNode.length-1];
  const deepestPath = [];
  while(dn) {
    if (!dn.height) {
      dn.height = 40;
    }
    if (!dn.width) {
      dn.width = 100;
    }
    deepestPath.unshift(dn);
    dn = dn.parent;
  }

  return deepestPath;
}

export function travelToRootFromLeafNodes(leafNodes, prop, defaultValue) {
  // leaf nodes; Complexity: O(leaf.length * deepest);
  console.log('travelToRootFromLeafNodes');
  leafNodes.forEach((node) => {
    node[prop] = node[prop] || defaultValue
    let accValue = node[prop];
    let parent = node.parent;
    while(parent) {
      let parentProp = parent[prop] || 0;
      parent[prop] = parentProp + accValue;
      accValue = parentProp + accValue;
      parent = parent.parent;
    }
  });
}

export function calcNodeOffsetFormFalttenHeader(flattenRow, prop, measure) {
  console.log('calcNodeOffsetFormFalttenHeader');
  for (let i = 0, iLength = flattenRow.length; i < iLength; i++) {
    let acc = 0;
    for (let j = 0, jLength = flattenRow[i].length; j < jLength; j++) {
      const curr = flattenRow[i][j];

      acc = acc === 0
              ? curr.parent
                ? curr.parent[prop]
                : 0
              : acc;

      curr[prop] = acc;
      acc += curr[measure];
    }
  }
}

export function calcMeasureFromDeepestPath(allNode, deepestPath, measure) {
  console.log('calcMeasureFromDeepestPath');
  for (let i = 0, iLength = allNode.length; i < iLength; i++) {
    const { rowSpan, colSpan, level } = allNode[i];
    if (deepestPath.indexOf(allNode[i]) !== -1) continue;
    allNode[i][measure] = 0;
    for (var j = level, jLength = (measure === 'height' ? rowSpan : colSpan) + level; j < jLength; j++) {
      allNode[i][measure] += deepestPath[j][measure];
    };
  }
}
