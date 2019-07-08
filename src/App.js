import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './component';

const mockReqData = {
  rowHeader: [{
    "name": "服装",
    prop: "category",
    width: 100,
    "children": [{
      "name": "裤子",
      prop: "sub_category",
      "children": [{
        "name": "2,017",
        width: 100,
        prop: "yearku2017",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 6,
        "identity": "服装::裤子::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        prop: "yearku2018",
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
        prop: "yeartotal",
        width: 100,
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 8,
        "identity": "服装裤子Total",
        "aggregateKeys": [6, 7],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "服装裤子",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "鞋子",
      prop: "sub_category",
      width: 100,
      "children": [{
        "name": "2,017",
        prop: "year",
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
        prop: "year",
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
        prop: "year",
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
      prop: "sub_category",
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
      prop: "info",
      children: [
        {
          name: "姓名",
          prop: "name",
          width: 160
        },
        {
          name: "地址",
          prop: "nx",
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
};

export default class App extends React.Component {

  state = {
    rowHeader: [],
    columnHeader: [],
    data: [],
    
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(mockReqData);
    }, 2000);
  }

  render() {
    const setting = JSON.parse(localStorage.getItem("table"));
    const {
      columnHeader,
      rowHeader,
      data,
    } = this.state;
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
          <h2>All feature</h2>
          <Table
            ref={n => window.tableEl = n}
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            setting={setting}
          />
        </div>
        <div style={{margin: 15}}>
          <h2>Disable resize</h2>
          <Table
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            resizeWidth={false}
          />
        </div>
        <div style={{margin: 15}}>
          <h2>Hide header</h2>
          <Table
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            resizeWidth={false}
            showColumnHeader={false}
            showRowHeader={false}
          />
        </div>
        <div style={{margin: 15}}>
          <h2>Width && Height</h2>
          <Table
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            width={400}
            height={200}
          />
        </div>
      </div>
    );
  }
};
