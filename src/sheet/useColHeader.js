import { useState, useMemo } from "react";
import {
  precessTree,
  calcNodeOffsetFormFalttenHeader,
  getLeafNodes,
  travelToRootFromLeafNodes,
  calcMeasureFromDeepestPath,
  getDeepestNodePath
} from './util';

export default function useColHeader({colHeader: rawHeader, cellWidth, cellHeight}) {

  const [{flattenRow, allColumns}] = useState(
    () =>  precessTree(rawHeader, ['colSpan', 'rowSpan'], { calcTop: cellHeight })
  );

  const measure = useMemo(() => {
    // use leaf nodes calc width & prop
    const leafNodes = getLeafNodes(rawHeader);

    // calculate width;
    travelToRootFromLeafNodes(leafNodes, 'width', cellWidth);

    // calculate left;
    calcNodeOffsetFormFalttenHeader(flattenRow, 'left', 'width');

    // use deepestnode store height
    const deepestNodePath = getDeepestNodePath(allColumns, cellWidth, cellHeight);
    calcMeasureFromDeepestPath(allColumns, deepestNodePath, 'height');
    
    const colHeaderHeight = deepestNodePath.reduce((acc, curr) => acc + curr.height, 0);
    const colHeaderWidth = leafNodes.reduce((acc, curr) => acc + curr.width, 0);

    return {
      colHeaderHeight,
      colHeaderWidth,
      colHeaderLeaf: leafNodes,
    }
  }, [rawHeader, flattenRow, allColumns]);

  return {
    colHeader: allColumns,
    ...measure,
  };
  
}