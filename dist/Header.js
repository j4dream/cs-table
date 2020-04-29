import React, { useContext } from 'react';
import { CSTableContext } from './index';
export default function () {
  const {
    cellWidth,
    cellHeight,
    renderHeader,
    dataAreaState
  } = useContext(CSTableContext);
  const {
    processedHeader: header,
    colStartIndex
  } = dataAreaState;
  return header.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: `h-${i}`,
    className: "cell",
    style: {
      position: 'absolute',
      width: cellWidth,
      height: cellHeight,
      left: (colStartIndex + i) * cellWidth
    }
  }, h.renderHeader ? h.renderHeader(h, h.prop) : renderHeader(h, h.prop)));
}