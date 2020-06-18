import { useState, useCallback, useMemo } from 'react';
import {
  processTree,
  getLeafNodes,
  travelToRootFromLeafNodes,
  calcNodeOffsetFormFalttenHeader,
  getDeepestNodePath,
  calcMeasureFromDeepestPath,
  calcDeepsetNodePathOffset,
} from './util';

export default function useRowHeader({ rowHeader: rawHeader, cellWidth, cellHeight }) {
  const { flattenRow, allColumns } = useMemo(
    () => processTree(rawHeader, ['rowSpan', 'colSpan'], { calcLeft: cellWidth }),
    [],
  );

  const buildHeaderTree = useCallback(() => {
    // use leaf nodes calc width & prop
    const leafNodes = getLeafNodes(rawHeader);

    // caculate height;
    travelToRootFromLeafNodes(leafNodes, 'height', cellHeight);

    // caculate top;
    calcNodeOffsetFormFalttenHeader(flattenRow, 'top', 'height');

    // use deepestnode store width
    const deepestNodePath = getDeepestNodePath(allColumns, cellWidth, cellHeight);
    calcDeepsetNodePathOffset(deepestNodePath, 'width');
    calcMeasureFromDeepestPath(allColumns, deepestNodePath, 'width');

    const rowHeaderWidth = deepestNodePath.reduce((acc, curr) => acc + curr.width, 0);
    const rowHeaderHeight = leafNodes.reduce((acc, curr) => acc + curr.height, 0);

    return {
      rowHeaderWidth,
      rowHeaderHeight,
      rowHeaderLeaf: leafNodes,
      rowDeepestPath: deepestNodePath,
    };
  }, [rawHeader, flattenRow, allColumns]);

  const [measure, setMeasure] = useState(() => buildHeaderTree());

  const rebuildRowHeader = useCallback(() => {
    setMeasure(buildHeaderTree());
  }, [buildHeaderTree, setMeasure]);

  return {
    rowHeader: allColumns,
    rebuildRowHeader,
    ...measure,
  };
}
