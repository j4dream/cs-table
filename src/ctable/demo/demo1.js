import React, { useState, memo } from 'react';
import Table from '../index';

const header = [
  {
    label: 'Operation',
    fixed: true,
    prop: 'op',
    width: 90,
    renderHeader: (h, p) => <a href="#">Operation</a>,
    renderCell: () => <a href="#">OP</a>,
  },
  {
    label: 'Email (Fixed)',
    fixed: true,
    prop: 'email',
  },
];
for (let i = 0; i < 10; i++) {
  header.push({
    label: `H ${i}`,
    prop: `${i}`,
  });
}

const data = [];
for (let r = 0; r < 100000; r++) {
  const row = {};
  for (let c = 0; c < 10; c++) {
    row[c] = `data ${r}:${c}`;
  }
  row['email'] = `test_${r}@email.com`;
  data.push(row);
}

export default memo(function () {
  const [count, setCount] = useState(0);

  const [h, setH] = useState(header);
  const [d, setD] = useState(data);
  const [preventScroll, setPreventScroll] = useState(false);

  return (
    <div>
      {/* <button onClick={() => setD([{email: 'update_email@test.com'}])}>Update Data</button>
      <button onClick={() => setH([{label: 'Email', prop: 'email'}])}>Update Header</button>
      <button onClick={() => {setD(data); setH(header);}}> Rstore</button>
      <button onClick={() => setCount(count + 1)}>Update Count</button>
      <button onClick={() => setPreventScroll(!preventScroll)}>Toggle fix scroll</button>
      <p>{count}</p> */}

      <p style={{ margin: 23 }}> 10 * 100000 (col * row)</p>

      <Table
        header={h}
        data={data}
        cellWidth={200}
        preventScroll={preventScroll}
        enableResize={true}
        // keepScrollStatus={true}
        // renderCell={(record, prop) => record[prop]}
        // renderHeader={(header, prop) => header[prop]}
      />
    </div>
  );
});
