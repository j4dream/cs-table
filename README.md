# CS Table, virtualized Table

Supports large amounts of data, built using react hooks.

![image](https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/30362ec0-6160-4873-be5a-3b39551a5a27/5539ea9f0cf2a3b799810f25/placeholder/demo.gif)

Install

```
npm i virtualized-sc-table
// or
yarn add virtualized-sc-table
```

[文档 Docs](https://j4dream.github.io/cs-table/)  
[CTable Online Demo](https://codesandbox.io/s/ctable-2l6l9)  
[STable Online Demo](https://codesandbox.io/s/stable-cfehb)

```javascript
import { CTable, STable } from 'virtualized-sc-table';

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
for (let i = 0; i < 200; i++) {
  header.push({
    label: `H ${i}`,
    prop: `${i}`,
  });
}

const data = [];
for (let r = 0; r < 10000; r++) {
  const row = {};
  for (let c = 0; c < 200; c++) {
    row[c] = `data ${r}:${c}`;
  }
  row['email'] = `test_${r}@email.com`;
  data.push(row);
}

<CTable
  header={header}
  data={data}
  // renderCell={(record, prop) => record[prop]}
  // renderHeader={(header, prop) => header[prop]}
/>;
```

## STable

Sheet can support grouping column header and row header.

| props | default | Desc |
| --- | --- | --- |
| colHeader: Array | [] | required \*, table header [{ label: 'Name', prop: 'name' }] |
| rowHeader: Array | [] | required \*, table header [{ label: 'Name', prop: 'name' }] |
| data: Array | [] | required \*, tabel data [{ name: 'DDR' }] |
| renderCell: Function | (record, rowProp, colProp, data) => record |
| cellWidth: number | 100 | config cell Width |
| cellHeight: number | 40 | config cell Height |
| enableColResize: boolean | false | support resize col|
| enableColSorting: boolean | false | support drag & drog to sort colunm header |
| enableRowResize: boolean | false | support resize col|
| enableRowSorting: boolean | false | support drag & drog to sort row headr |


## CTable

| props | default | Desc |
| --- | --- | --- |
| header: Array | [] | required \*, table header [{ label: 'Name', prop: 'name' }] |
| data: Array | [] | required \*, tabel data [{ name: 'DDR' }] |
| preventScroll: Boolean | false | toggle scroll, prevent scroll |
| keepScrollStatus: Boolean | false | when data or header update, keep scroll status, ortherwise scroll to {0, 0} |
| enableResize: Boolean | false | resize col width |
| renderCell: Function | (record, rowIndex, prop, header) => record |
| renderHeader: Function | (header, prop) => header.label |

