import { useRef, useState } from "react";
import {
  convertToColumnHeader,
  getLeafNodes,
  calcNodesWidth,
  calcNodesHeight,
  calcNodesLeft,
  getDeepestNodePath
} from './util';

export default function useTree(rawColHeader) {
  const [{flattenRow, allColumns}] = useState(convertToColumnHeader(rawColHeader));
  // use deepestnode store height
  const deepestNodePath = useRef(getDeepestNodePath(allColumns));
  // use leaf nodes calc width & prop
  const leafNodesRef = useRef(getLeafNodes(rawColHeader));

  calcNodesWidth(leafNodesRef.current);
  calcNodesLeft(flattenRow);
  calcNodesHeight(allColumns, deepestNodePath.current);

  return {
    colHeader: flattenRow,
    leafNodes: leafNodesRef.current,
  };
  
}
