export function convertToColumnHeader(columns = []) {
  let maxLevel = 1;

  function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 1;
    }

    if (column.children) {
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
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = [];
  const queue = columns.slice();
  for (let i = 0; queue[i]; i++) {
    allColumns.push(queue[i]);
    if (queue[i].children) queue.push(...queue[i].children);
  }

  allColumns.forEach((column) => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });
  return rows;
  
}

export function convertToRowHeader(columns = []) {
  let maxLevel = 1;
  let rowsLength = 0;

  function traverse(column, parent) {
    if (parent) {
      column.parent = parent;
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 1;
    }

    // 计算 row span 以及计算有几个 叶子
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

  let rows = []
  for(let i = 0; i < rowsLength; i++) {
    rows.push([]);
  };

  // 记录位置 index
  const posCount = {};
  for(let i = 1; i <= maxLevel; i++) {
    posCount[i] = 0;
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


  allColumns.forEach(column => {
    const { rowSpan, level } = column;
    // 如果占用了位置 则添加 offset
    let offset = 0; 
    column.start = posCount[level];
    if (column.parent && column.parent.start > column.start) {
      offset += column.parent.start - column.start;
      column.start += offset;
    }
    posCount[level] += offset;
    rows[posCount[level]].push(column);
    posCount[level] += rowSpan;
  });
  return rows;
}

export function getLeafColumns(columns) {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push(...getLeafColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
}

let ascId = 0;
export function getAscId(){
  return ascId++;
}
