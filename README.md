# CS Table, virtualized Table

Supports large amounts of data, built using react hooks.

[Demo](https://j4dream.github.io/cs-table/)

```javascript
import Table from 'virtualized-sc-table';

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

<Table
  header={header}
  data={data}
  // renderCell={(record, prop) => record[prop]}
  // renderHeader={(header, prop) => header[prop]}
/>;
```

| props | default | Desc |
| --- | --- | --- |
| header: Array | [] | required \*, table header [{ label: 'Name', prop: 'name' }] |
| data: Array | [] | required \*, tabel data [{ name: 'DDR' }] |
| preventScroll: Boolean | false | toggle scroll, prevent scroll |
| keepScrollStatus: Boolean | false | when data or header update, keep scroll status, ortherwise scroll to {0, 0} |
| enableResize: Boolean | false | resize col width |
| renderCell: Function | (record, rowIndex, prop, header) => record |
| renderHeader: Function | (header, prop) => header.label |

## Sheet

Sheet can support grouping column header and row header. props | default | Desc ---|---|---| colHeader: Array | [] | required _, table header [{ label: 'Name', prop: 'name' }] colHeader: Array | [] | required _, table header [{ label: 'Name', prop: 'name' }] data: Array | [] | required \*, tabel data [{ name: 'DDR' }] renderCell: Function | (record, rowProp, colProp, data) => record | cellWidth: number | 100 | config cell Width cellHeight: number | 40 | config cell Height
