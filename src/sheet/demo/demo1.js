import React from 'react';
import Sheet from '../index';

import simpleData from './data';

export default function() {
  const { rowHeader, colHeader, data } = simpleData;
  return (
    <div>
      <Sheet
        rowHeader={rowHeader}
        colHeader={colHeader}
        data={data}
        enableResize
        enableSortHeader
      />
    </div>
  )
}