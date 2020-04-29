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
props | default
---|---
renderCell: Function | (record, rowIndex, prop) => record
renderHeader: Function | (header, prop) => header.label