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

  useMemo(() => {
    // use leaf nodes calc width & prop
    const leafNodes = getLeafNodes(rawHeader);

    // caculate height;
    travelToRootFromLeafNodes(leafNodes, 'height', 40);

    // caculate top;
    calcNodeOffsetFormFalttenHeader(flattenRow, 'top', 'height');

    // use deepestnode store width
    const deepestNodePath = getDeepestNodePath(allColumns);
    calcMeasureFromDeepestPath(allColumns, deepestNodePath, 'width');

  }, [rawHeader, flattenRow, allColumns]);

  return {
    header: flattenRow,
  };
  
}
