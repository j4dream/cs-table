import { useRef } from "react";
import { convertToColumnHeader } from './util';

export default function useTree({colHeader: rawColHeader}) {
  const children = useRef();
  const colHeader = useRef(convertToColumnHeader(rawColHeader));
  const deepestNodePath = useRef([]);
  const leafNodes = useRef([]);

  return {
    colHeader
  };
  
}
