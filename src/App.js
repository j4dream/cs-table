import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './component';

const state = {
  rowHeader: [{
    "name": "服装",
    "field": "category",
    width: 100,
    "children": [{
      "name": "裤子",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
        width: 100,
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 6,
        "identity": "服装::裤子::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        width: 100,
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 7,
        "identity": "服装::裤子::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        width: 100,
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 8,
        "identity": "服装::裤子::Total",
        "aggregateKeys": [6, 7],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "服装::裤子",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "鞋子",
      "field": "sub_category",
      width: 100,
      "children": [{
        "name": "2,017",
        "field": "year",
        width: 100,
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 9,
        "identity": "服装::鞋子::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        width: 100,
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 10,
        "identity": "服装::鞋子::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        width: 100,
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 11,
        "identity": "服装::鞋子::Total",
        "aggregateKeys": [9, 10],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "服装::鞋子",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "Total",
      "field": "sub_category",
      width: 100,
      "children": [],
      "subtotals": true,
      "grandTotals": false,
      "key": 12,
      "identity": "服装::Total",
      "aggregateKeys": [0, 1, 3, 4, 6, 7, 9, 10],
      "root": false
    }],
    "subtotals": false,
    "grandTotals": false,
    "identity": "服装",
    "aggregateKeys": [],
    "root": false
  }],
  columnHeader:   [
    {
      name: "日期",
      prop: "date",
      width: 150
    },
    {
      name: "配送信息",
      children: [
        {
          name: "姓名",
          prop: "name",
          width: 160
        },
        {
          name: "地址",
          children: [
            {
              name: "省份",
              prop: "province",
              width: 160
            },
            {
              name: "城市",
              prop: "address",
              width: 400
            },
            {
              name: "邮编",
              prop: "zip",
              width: 120
            }
          ]
        }
      ]
    }
  ],
  data: [{
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }]
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>DC Table Component</p>
      </header>
      <div style={{margin: 15}}>
        <Table
          columnHeader={state.columnHeader}
          rowHeader={state.rowHeader}
          data={state.data}
        />
      </div>
    </div>
  );
}

export default App;
