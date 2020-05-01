import React, { useState, memo } from 'react';
import CSTable from '../index';
const header = [{
  label: 'Operation',
  fixed: true,
  prop: 'op',
  width: 90,
  renderHeader: (h, p) => /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "select all ", p),
  renderCell: () => /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Delete")
}, {
  label: 'Email',
  fixed: true,
  prop: 'email'
}];

for (let i = 0; i < 20; i++) {
  header.push({
    label: `H ${i}`,
    prop: `${i}`
  });
}

const data = [];

for (let r = 0; r < 20; r++) {
  const row = {};

  for (let c = 0; c < 20; c++) {
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setD([{
      email: 'update_email@test.com'
    }])
  }, "Update Data"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setH([{
      label: 'Email',
      prop: 'email'
    }])
  }, "Update Header"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setD(data);
      setH(header);
    }
  }, " Rstore"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCount(count + 1)
  }, "Update Count"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPreventScroll(!preventScroll)
  }, "Toggle fix scroll"), /*#__PURE__*/React.createElement("p", null, count), /*#__PURE__*/React.createElement(CSTable, {
    header: h,
    data: d,
    cellWidth: 200,
    preventScroll: preventScroll // renderCell={(record, prop) => record[prop]}
    // renderHeader={(header, prop) => header[prop]}

  }));
});