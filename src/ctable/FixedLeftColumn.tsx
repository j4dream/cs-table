import React, { useContext } from 'react';
import { CTableContext } from './index';

export default function (): React.FunctionComponent {
  const { cellWidth, cellHeight, dataAreaState, renderCell } = useContext(CTableContext);

  const { processedData: data, rowStartIndex, fixedLeftCol } = dataAreaState;
  return data.map((_, rowIndex: number) =>
    fixedLeftCol.map((h, colIndex: number) => (
      <div
        className="cell fixed-left"
        key={`f-c-${rowIndex}-${colIndex}`}
        style={{
          position: 'absolute',
          top: (rowIndex + rowStartIndex) * cellHeight,
          left: h.left,
          width: h.width || cellWidth,
          height: cellHeight,
        }}
      >
        {h.renderCell
          ? h.renderCell(data[rowIndex][h.prop], rowIndex + rowStartIndex, h.prop, h)
          : renderCell(data[rowIndex][h.prop], rowIndex + rowStartIndex, h.prop, h)}
      </div>
    )),
  );
}
