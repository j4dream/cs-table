import { useState, useMemo, useCallback, useRef } from 'react';
import {
  processTree,
  calcNodeOffsetFormFalttenHeader,
  getLeafNodes,
  travelToRootFromLeafNodes,
  calcMeasureFromDeepestPath,
  getDeepestNodePath,
  switchPosByProps,
} from './util';
import { STableHeaders } from './';
import useForceUpdate from '../hooks/useForceUpdate';
import useUpdateEffect from '../hooks/useUpdateEffect';

type UseColHeaderParams = {
  colHeader: STableHeaders;
  cellWidth: number;
  cellHeight: number;
};

export default function useColHeader({
  colHeader: rawHeader,
  cellWidth,
  cellHeight,
}: UseColHeaderParams) {
  const rawHeaderRef = useRef(rawHeader);
  const { forceUpdate, updateCount } = useForceUpdate();

  const { flattenRow, allColumns } = useMemo(() => {
    if (updateCount) {
      console.warn('forceupdate');
    }
    return processTree(rawHeaderRef.current, ['colSpan', 'rowSpan'], { calcTop: cellHeight });
  }, [updateCount, cellHeight]);

  const buildHeaderTree = useCallback((rebuild?: boolean) => {
    // use leaf nodes calc width & prop
    const leafNodes = getLeafNodes(rawHeaderRef.current);

    // calculate width;
    travelToRootFromLeafNodes(leafNodes, 'width', cellWidth, rebuild);

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
    };
  }, [flattenRow, allColumns, cellHeight, cellWidth]);

  const [measure, setMeasure] = useState(() => buildHeaderTree());

  const handleColSort = useCallback(
    (p1, p2) => {
      const switchSuccess = switchPosByProps(rawHeaderRef.current, p1, p2);
      if (switchSuccess) {
        forceUpdate();
      }
    },
    [forceUpdate],
  );

  const rebuildColHeader = useCallback(() => {
    setMeasure(buildHeaderTree(true));
  }, [buildHeaderTree, setMeasure]);

  useUpdateEffect(() => {
    if (updateCount !== 0) {
      rebuildColHeader();
    }
  }, [updateCount, rebuildColHeader]);

  return {
    ...measure,
    colHeader: allColumns,
    rebuildColHeader,
    handleColSort,
  };
}
