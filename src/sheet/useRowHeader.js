import { useState, useCallback, useMemo, useRef } from 'react';
import {
  processTree,
  getLeafNodes,
  travelToRootFromLeafNodes,
  calcNodeOffsetFormFalttenHeader,
  getDeepestNodePath,
  calcMeasureFromDeepestPath,
  calcDeepsetNodePathOffset,
  switchPosByProps,
} from './util';
import useUpdateEffect from '../hooks/useUpdateEffect';
import useForceUpdate from '../hooks/useForceUpdate';

export default function useRowHeader({ rowHeader: rawHeader, cellWidth, cellHeight }) {
  const rawHeaderRef = useRef(rawHeader);
  const { forceUpdate, updateCount } = useForceUpdate();

  const { flattenRow, allColumns } = useMemo(
    () => processTree(rawHeaderRef.current, ['rowSpan', 'colSpan'], { calcLeft: cellWidth }),
    [rawHeaderRef.current, updateCount],
  );

  const buildHeaderTree = useCallback(() => {
    // use leaf nodes calc width & prop
    const leafNodes = getLeafNodes(rawHeaderRef.current);

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
  }, [rawHeaderRef.current, flattenRow, allColumns]);

  const [measure, setMeasure] = useState(() => buildHeaderTree());

  const handleRowSort = useCallback(
    (p1, p2) => {
      const switchSuccess = switchPosByProps(rawHeaderRef.current, p1, p2);
      if (switchSuccess) {
        forceUpdate();
      }
    },
    [rawHeaderRef.current, forceUpdate],
  );

  const rebuildRowHeader = useCallback(() => {
    setMeasure(buildHeaderTree());
  }, [buildHeaderTree, setMeasure]);

  useUpdateEffect(() => {
    if (updateCount !== 0) {
      rebuildRowHeader();
    }
  }, [updateCount, rebuildRowHeader]);

  return {
    ...measure,
    rowHeader: allColumns,
    rebuildRowHeader,
    handleRowSort,
  };
}
