import React from 'react';
import AutoSizeSheet from '../AutoSizeSTable';

import simpleData from './data';

export default function () {
  const { rowHeader, colHeader, data } = simpleData;
  return (
    <div>
      <div
        style={{
          height: 500,
        }}
      >
        <AutoSizeSheet
          rowHeader={rowHeader}
          colHeader={colHeader}
          data={data}
          cellWidth={100}
          cellHeight={40}
          enableColResize
          enableRowResize
          enableColSorting
          enableRowSorting
        />
      </div>
    </div>
  );
}
