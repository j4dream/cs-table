import React from 'react';
import AutoSizeSheet from '../AutoSizeSTable';

import simpleData from './data';

export default function () {
  const { rowHeader, colHeader, data } = simpleData;
  return (
    <div>
      {/* <Sheet
        rowHeader={rowHeader}
        colHeader={colHeader}
        data={data}
        enableResize
        enableSortHeader
      /> */}

      <div
        style={{
          height: 400,
        }}
      >
        <AutoSizeSheet
          rowHeader={rowHeader}
          colHeader={colHeader}
          data={data}
          cellWidth={120}
          cellHeight={44}
          enableColResize
          enableColSorting
          enableRowSorting
        />
      </div>
    </div>
  );
}
