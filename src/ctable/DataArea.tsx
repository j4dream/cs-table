import React, { useContext } from 'react';
import { CTableContext } from './index';

export default function (): JSX.Element {
  const { renderCell, cellWidth = 120, cellHeight = 40, dataAreaState } = useContext(CTableContext);

  const { processedHeader: header, processedData: data, rowStartIndex } = dataAreaState;

  return (
    <>
      {data.map((_, rowIndex) =>
        header.map((h, colIndex) => (
          <div
            className="cell"
            key={`d-a-${rowIndex}-${colIndex}`}
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
      )}
    </>
  );
}
