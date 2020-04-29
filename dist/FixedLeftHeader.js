import React, { useContext } from 'react';
import { CSTableContext } from './index';
export default function () {
  const {
    cellWidth,
    cellHeight,
    dataAreaState,
    renderHeader
  } = useContext(CSTableContext);
  const {
    fixedLeftCol
  } = dataAreaState;
  console.log('fixedLeftCol', fixedLeftCol);
  return fixedLeftCol.map((h, colIndex) => /*#__PURE__*/React.createElement("div", {
    key: `f-h-${colIndex}`,
    className: "cell",
    style: {
      position: 'absolute',
      left: h.left,
      width: h.width || cellWidth,
      height: cellHeight
    }
  }, h.renderHeader ? h.renderHeader(h, h.prop) : renderHeader(h, h.prop)));
}