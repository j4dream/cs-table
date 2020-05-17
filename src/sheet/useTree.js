import { useRef, useState } from "react";
import {
  convertToColumnHeader,
  convertToRowHeader,
  getLeafNodes,
  calcNodesWidth,
  calcNodesHeight,
  calcNodesLeft,
  getDeepestNodePath
} from './util';

export default function useTree(rawHeader) {
  const [{flattenRow, allColumns}] = useState(convertToColumnHeader(rawHeader));

  // use leaf nodes calc width & prop
  const leafNodesRef = useRef(getLeafNodes(rawHeader));

  calcNodesWidth(leafNodesRef.current);
  calcNodesLeft(flattenRow);
  
  // use deepestnode store height
  const deepestNodePath = useRef(getDeepestNodePath(allColumns));
  calcNodesHeight(allColumns, deepestNodePath.current);

  return {
    header: flattenRow,
    leafNodes: leafNodesRef.current,
  };
  
}
