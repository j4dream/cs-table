import { useState, useMemo } from "react";
import {
  precessTree,
  getLeafNodes,
  travelToRootFromLeafNodes,
  calcNodeOffsetFormFalttenHeader,
  getDeepestNodePath,
  calcMeasureFromDeepestPath,
} from './util';

export default function useRowHeader(rawHeader) {

  const [{flattenRow, allColumns},] = useState(
    precessTree(rawHeader, ['rowSpan', 'colSpan'], { calcLeft: 100 })
  );

  const measure = useMemo(() => {
    // use leaf nodes calc width & prop
    const leafNodes = getLeafNodes(rawHeader);

    // caculate height;
    travelToRootFromLeafNodes(leafNodes, 'height', 40);

    // caculate top;
    calcNodeOffsetFormFalttenHeader(flattenRow, 'top', 'height');

    // use deepestnode store width
    const deepestNodePath = getDeepestNodePath(allColumns);
    calcMeasureFromDeepestPath(allColumns, deepestNodePath, 'width');

    const rowHeaderWidth = deepestNodePath.reduce((acc, curr) => acc + curr.width, 0);
    const rowHeaderHeight = leafNodes.reduce((acc, curr) => acc + curr.height, 0);

    return {
      rowHeaderWidth,
      rowHeaderHeight,
      rowHeaderLeaf: leafNodes,
    }
  }, [rawHeader, flattenRow, allColumns]);

  return {
    header: flattenRow,
    ...measure,
  };
  
}
