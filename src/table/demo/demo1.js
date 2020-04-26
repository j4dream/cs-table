import React from 'react';
import CSTable from '../index';

const header = [];
for (let i = 0; i < 30; i++) {
  header.push({
    label: `H ${i}`,
    prop: `${i}`,
  });
}

const data = [];

 
  for(let prop = 0; prop < 30; prop++) {
    const row = {};
    for(let r = 0; r < 100; r++) {
      row.label = `data `;
    }
    data.push(row);
  }
 

export default function() {
  return (
    <CSTable
      header={header}
      data={data}
    />
  );
}