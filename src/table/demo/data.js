const header = [
  {
    label: '#',
    fixed: true,
    prop: 'rowIndex',
    width: 50,
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
  row['rowIndex'] = r;
  data.push(row);
}

export {
  header,
  data,
};