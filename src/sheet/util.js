export function convertToColumnHeader(columns = []) {
  let maxLevel = 1;

  function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      column.top = parent.top + 40;
      column.parent = parent;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 0;
      column.top = 0;
    }

    if (column.children.length) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  }

  columns.forEach((column) => {
    traverse(column);
  });

  const rows = [];
  for (let i = 0; i <= maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = [];
  const queue = columns.slice();
  for (let i = 0; queue[i]; i++) {
    allColumns.push(queue[i]);
    if (queue[i].children.length) queue.push(...queue[i].children);
  }

  allColumns.forEach((column) => {
    if (!column.children.length) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level].push(column);
  });
  console.log(allColumns);
  return {
    flattenRow: rows,
    allColumns,
  };
  
}


export function convertToRowHeader(columns = []) {
  let maxLevel = 1;
  let rowsLength = 0;

  function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      column.left = parent.left + 100;
      column.parent = parent;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 0;
      column.left = 0;
    }

    if (column.children.length > 0) {
      let rowSpan = 0;
      column.children.forEach((child) => {
        traverse(child, column);
        rowSpan += child.rowSpan;
      });
      column.rowSpan = rowSpan;
    } else {
      column.rowSpan = 1;
      return rowsLength++;
    }
  }

  columns.forEach((column) => {
    traverse(column);
  });

  const rows = [];
  for(let i = 0; i <= maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = [];
  const queue = columns.slice();
  for (let i = 0; queue[i]; i++) {
    allColumns.push(queue[i]);
    if (queue[i].children) queue.push(...queue[i].children);
  }

  // 计算 col span, 
  allColumns.forEach((column) => {
    if (column.children.length === 0) {
      column.colSpan = maxLevel - column.level + 1;
    } else {
      column.colSpan = 1;
    }
  });


  allColumns.forEach((column) => {
    if (!column.children.length) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
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
      result.push(node);
    }
  });
  return result;
}

export function getDeepestNodePath(allNode = []) {
  // deepest node
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

export function calcNodesWidth(nodes, defaultWidth = 100) {
  // left nodes; Complexity: O(leaf.length * deepest);
  nodes.forEach((n) => {
    let curr = n;
    curr.width = curr.width || defaultWidth
    let accWidth = curr.width;
    let parent = curr.parent;
    while(parent) {
      let parentWidth = parent.width || 0;
      parent.width = parentWidth + accWidth;
      accWidth = parentWidth + accWidth;
      parent = parent.parent;
    }
  });
}

export function calcRowNodesHeight(nodes, defaultHeight = 40) {
  nodes.forEach((n) => {
    let curr = n;
    curr.height = curr.height || defaultHeight
    let accHeight = curr.height;
    let parent = curr.parent;
    while(parent) {
      let parentheight = parent.height || 0;
      parent.height = parentheight + accHeight;
      accHeight = parentheight + accHeight;
      parent = parent.parent;
    }
  });
}

export function calcNodesLeft(flattenRow) {
  // note: for loop faster than forEach
  for (let i = 0; i < flattenRow.length; i++) {
    let acc = 0;
    for (let j = 0; j < flattenRow[i].length; j++) {
      const curr = flattenRow[i][j];

      acc = acc === 0
              ? curr.parent
                ? curr.parent.left
                : 0
              : acc;

      curr.left = acc;
      acc += curr.width;
    }
  }
}

export function calcRowNodesTop(flattenRow) {
  // note: for loop faster than forEach
  for (let i = 0; i < flattenRow.length; i++) {
    let acc = 0;
    for (let j = 0; j < flattenRow[i].length; j++) {
      const curr = flattenRow[i][j];

      acc = acc === 0
              ? curr.parent
                ? curr.parent.top
                : 0
              : acc;

      curr.top = acc;
      acc += curr.height;
    }
  }
}

export function calcNodesHeight(allNode, deepestPath) {
  for (let i = 0; i < allNode.length; i++) {
    const { rowSpan, level } = allNode[i];
    if (deepestPath.indexOf(allNode[i]) !== -1) continue;
    allNode[i].height = 0;
    for (var j = level; j < rowSpan + level; j++) {
      allNode[i].height += deepestPath[j].height;
    };
  }
}

export function calcRowNodeWidth(allNode, deepestPath) {
  for (let i = 0; i < allNode.length; i++) {
    const { colSpan, level } = allNode[i];
    if (deepestPath.indexOf(allNode[i]) !== -1) continue;
    allNode[i].width = 0;
    for (var j = level; j < colSpan + level; j++) {
      allNode[i].width += deepestPath[j].width;
    };
  }
}

