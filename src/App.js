import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './component';

const state = {
  rowHeader: [{
    "name": "服装",
    "field": "category",
    "children": [{
      "name": "上衣",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 0,
        "identity": "服装::上衣::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 1,
        "identity": "服装::上衣::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 2,
        "identity": "服装::上衣::Total",
        "aggregateKeys": [0, 1],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "服装::上衣",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "帽子",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 3,
        "identity": "服装::帽子::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 4,
        "identity": "服装::帽子::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 5,
        "identity": "服装::帽子::Total",
        "aggregateKeys": [3, 4],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "服装::帽子",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "裤子",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
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
      "children": [{
        "name": "2,017",
        "field": "year",
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
  }, {
    "name": "Grand Totalx",
    "field": "category/sub_category/year",
    "children": [],
    "subtotals": false,
    "grandTotals": true,
    "key": 26,
    "identity": "Grand xTotal",
    "aggregateKeys": [0, 1, 3, 4, 6, 7, 9, 10, 13, 14, 16, 17, 19, 20, 22, 23],
    "root": false
  }, {
    "name": "电器",
    "field": "category",
    "children": [{
      "name": "冰箱",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 13,
        "identity": "电器::冰箱::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 14,
        "identity": "电器::冰箱::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 15,
        "identity": "电器::冰箱::Total",
        "aggregateKeys": [13, 14],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "电器::冰箱",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "电视",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 16,
        "identity": "电器::电视::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 17,
        "identity": "电器::电视::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 18,
        "identity": "电器::电视::Total",
        "aggregateKeys": [16, 17],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "电器::电视",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "空调",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 19,
        "identity": "电器::空调::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 20,
        "identity": "电器::空调::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 21,
        "identity": "电器::空调::Total",
        "aggregateKeys": [19, 20],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "电器::空调",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "风扇",
      "field": "sub_category",
      "children": [{
        "name": "2,017",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 22,
        "identity": "电器::风扇::2,017",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "2,018",
        "field": "year",
        "children": [],
        "subtotals": false,
        "grandTotals": false,
        "key": 23,
        "identity": "电器::风扇::2,018",
        "aggregateKeys": [],
        "root": false
      }, {
        "name": "Total",
        "field": "year",
        "children": [],
        "subtotals": true,
        "grandTotals": false,
        "key": 24,
        "identity": "电器::风扇::Total",
        "aggregateKeys": [22, 23],
        "root": false
      }],
      "subtotals": false,
      "grandTotals": false,
      "identity": "电器::风扇",
      "aggregateKeys": [],
      "root": false
    }, {
      "name": "Total",
      "field": "sub_category",
      "children": [],
      "subtotals": true,
      "grandTotals": false,
      "key": 25,
      "identity": "电器::Total",
      "aggregateKeys": [13, 14, 16, 17, 19, 20, 22, 23],
      "root": false
    }],
    "subtotals": false,
    "grandTotals": false,
    "identity": "电器",
    "aggregateKeys": [],
    "root": false
  }, {
    "name": "Grand Total",
    "field": "category/sub_category/year",
    "children": [],
    "subtotals": false,
    "grandTotals": true,
    "key": 26,
    "identity": "Grand Total",
    "aggregateKeys": [0, 1, 3, 4, 6, 7, 9, 10, 13, 14, 16, 17, 19, 20, 22, 23],
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
