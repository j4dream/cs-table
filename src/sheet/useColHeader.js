import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  processTree,
  calcNodeOffsetFormFalttenHeader,
  getLeafNodes,
  travelToRootFromLeafNodes,
  calcMeasureFromDeepestPath,
  getDeepestNodePath,
  switchPosByProps,
} from './util';
import useForceUpdate from "../hooks/useForceUpdate";
import useUpdateEffect from "../hooks/useUpdateEffect";

export default function useColHeader({colHeader: rawHeader, cellWidth, cellHeight}) {

  const rawHeaderRef = useRef(rawHeader);
  const {forceUpdate, updateCount} = useForceUpdate();

  const {flattenRow, allColumns} = useMemo(
    () =>  processTree(rawHeaderRef.current, ['colSpan', 'rowSpan'], { calcTop: cellHeight })
  , [rawHeaderRef.current, updateCount]);

  const buildHeaderTree = useCallback(() => {
    // use leaf nodes calc width & prop
    const leafNodes = getLeafNodes(rawHeaderRef.current);

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
  }, [rawHeaderRef.current, flattenRow, allColumns]);

  const [measure, setMeasure] = useState(() => buildHeaderTree());

  const handleColSort = useCallback((p1, p2) => {
    const switchSuccess = switchPosByProps(rawHeaderRef.current, p1, p2);
    if (switchSuccess) {
      forceUpdate();
    }
  }, [rawHeaderRef.current, forceUpdate]);

  const rebuildColHeader = useCallback(() => {
    setMeasure(buildHeaderTree());
  }, [buildHeaderTree, setMeasure]);

  useUpdateEffect(() => {
    if (updateCount!==0) {
      rebuildColHeader();
    }
  }, [updateCount, rebuildColHeader]);
 
  return {
    colHeader: allColumns,
    rebuildColHeader,
    ...measure,
    handleColSort,
  };
  
}
