import { useRef, useState } from "react";
import { convertToColumnHeader, getLeafNodes, calcNodesWidth } from './util';

export default function useTree({colHeader: rawColHeader}) {
  const children = useRef();
  const [{flattenRow, allColumns}] = useState(convertToColumnHeader(rawColHeader));
  // use deepestnode calc height
  const deepestNodePath = useRef([]);
  // use leaf nodes calc width
  const leafNodesRef = useRef(getLeafNodes(rawColHeader));

  calcNodesWidth(leafNodesRef.current);

  console.log('all clounms', allColumns);

  return {
    colHeader: flattenRow,
    leafNodes: leafNodesRef.current,
  };
  
}
