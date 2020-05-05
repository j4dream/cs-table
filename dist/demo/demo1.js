import React, { useState, memo } from 'react';
import Table from '../index';
const header = [{
  label: 'Operation',
  fixed: true,
  prop: 'op',
  width: 90,
  renderHeader: (h, p) => /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Operation"),
  renderCell: () => /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "OP")
}, {
  label: 'Email (Fixed)',
  fixed: true,
  prop: 'email'
}];

for (let i = 0; i < 200; i++) {
  header.push({
    label: `H ${i}`,
    prop: `${i}`
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

export default memo(function () {
  const [count, setCount] = useState(0);
  const [h, setH] = useState(header);
  const [d, setD] = useState(data);
  const [preventScroll, setPreventScroll] = useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 23
    }
  }, " 200 * 10000 (col * row)"), /*#__PURE__*/React.createElement(Table, {
    header: h,
    data: d,
    cellWidth: 200,
    preventScroll: preventScroll,
    enableResize: true // renderCell={(record, prop) => record[prop]}
    // renderHeader={(header, prop) => header[prop]}

  }));
});