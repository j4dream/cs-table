import React, { useState, memo } from 'react';
import CSTable from '../index';

const header = [
  {
    label: 'Operation',
    fixed: true,
    prop: 'op',
    width: 90,
    renderHeader: (h, p) => <a href="#">select all {p}</a>,
    renderCell: () => <a href="#">Delete</a>
  },
  {
    label: 'Email',
    fixed: true,
    prop: 'email',
  }
];
for (let i = 0; i < 20; i++) {
  header.push({
    label: `H ${i}`,
    prop: `${i}`,
  });
}

const data = [];
 
for(let r = 0; r < 20; r++) {
  const row = {};
  for(let c = 0; c < 20; c++) {
    row[c] = `data ${r}:${c}`;
  }
  row['email'] = `test_${r}@email.com`;
  data.push(row);
}
 

export default memo(function() {

  const [count, setCount] = useState(0);

  console.log(header, data);

  return (
    <div>
      <button onClick={() => setCount(count+1)}>Rerender button {count}</button>
      <CSTable
        header={header}
        data={data}
        cellWidth={200}
        // renderCell={(record, prop) => record[prop]}
        // renderHeader={(header, prop) => header[prop]}
      />
    </div>
  );
});