import React, { useContext } from 'react';
import { CSTableContext } from './index';
export default function () {
  const {
    renderCell,
    cellWidth = 120,
    cellHeight = 40,
    dataAreaState
  } = useContext(CSTableContext);
  const {
    processedHeader: header,
    processedData: data,
    rowStartIndex
  } = dataAreaState;
  return data.map((_, rowIndex) => header.map((h, colIndex) => /*#__PURE__*/React.createElement("div", {
    className: "cell",
    key: `d-a-${rowIndex}-${colIndex}`,
    style: {
      position: 'absolute',
      top: (rowIndex + rowStartIndex) * cellHeight,
      left: h.left,
      width: h.width || cellWidth,
      height: cellHeight
    }
  }, h.renderCell ? h.renderCell(data[rowIndex][h.prop], rowIndex + rowStartIndex, h.prop, h) : renderCell(data[rowIndex][h.prop], rowIndex + rowStartIndex, h.prop, h))));
}