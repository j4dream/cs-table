import React from 'react';
import './style.css';

export default function CSTable(props) {

  const {
    header,
    data,
    renderCell,
    width,
    height,
    cellWidth = 120,
    cellHeight = 40,
  } = props;

  console.log(data);

  return (
    <div className="cs-table" style={{position: 'relative', height: 400}}>
      <div>
      {
        header.map((h, i) => <div className="cell" style={{position: 'absolute', width: cellWidth, height: cellHeight, lineHeight: '40px', left: i * cellWidth}}>{h.label}</div>)
      }
      {
        data.map((row, rowIndex) => (
          header.map((h, colIndex) => (
            <div className="cell" style={{position: 'absolute', top: (1 + rowIndex) * cellHeight, lineHeight: '40px', left: colIndex * cellWidth, width: cellWidth, height: cellHeight}}>
              {row.label}
            </div>
          ))
        ))
      }
      </div>
    </div>
  );
}
