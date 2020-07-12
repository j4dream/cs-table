# CS Table, virtualized Table

Supports large amounts of data, built using react hooks.

Install

```
npm i virtualized-sc-table
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

## STable

Sheet can support grouping column header and row header.

| props | default | Desc |
| --- | --- | --- |
| colHeader: Array | [] | required \_, table header [{ label: 'Name', prop: 'name' }] |
| rowHeader: Array | [] | required \_, table header [{ label: 'Name', prop: 'name' }] |
| data: Array | [] | required \_, tabel data [{ name: 'DDR' }] |
| renderCell: Function | (record, rowProp, colProp, data) => record |
| cellWidth: number | 100 | config cell Width |
| cellHeight: number | 40 | config cell Height |
| enableColResize: boolean | false | support resize resize |
| enableColSorting: boolean | false | support drag & drog to sort col header |
| enableRowSorting: boolean | false | support drag & drog to sort row headr |
