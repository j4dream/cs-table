import { useRef, useState } from "react";
import {
  convertToColumnHeader,
  convertToRowHeader,
  getLeafNodes,
  calcRowNodesHeight,
  calcRowNodesTop,
  getDeepestNodePath,
  calcRowNodeWidth,
} from './util';

export default function useRowHeader(rawHeader) {
  const [{flattenRow, allColumns}] = useState(convertToRowHeader(rawHeader));
  
  // use leaf nodes calc width & prop
  const leafNodesRef = useRef(getLeafNodes(rawHeader));

  calcRowNodesHeight(leafNodesRef.current);
  calcRowNodesTop(flattenRow);

  // use deepestnode store width
  const deepestNodePath = useRef(getDeepestNodePath(allColumns));
  calcRowNodeWidth(allColumns, deepestNodePath.current);

  return {
    header: flattenRow,
    leafNodes: leafNodesRef.current,
  };
  
}
