# CS Table, virtualized Table

Supports large amounts of data, built using react hooks.

[Demo](./src/table/demo/demo1.js)

```
<CSTable
  header={header}
  data={data}
  // renderCell={(record, prop) => record[prop]}
  // renderHeader={(header, prop) => header[prop]}
/>
```
props | default | Desc
---|---|---|
header: Array | [] | required *, table header [{ label: 'Name', prop: 'name' }]
data: Array | [] | required *, tabel data [{ name: 'DDR' }]
preventScroll: Boolean | fase | toggle scroll, prevent scroll
renderCell: Function | (record, rowIndex, prop, header) => record | 
renderHeader: Function | (header, prop) => header.label | 