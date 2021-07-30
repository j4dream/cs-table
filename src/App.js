import React from 'react';
import './App.css';
import CTable from './ctable/demo/demo1';

import Sheet from './stable/demo/demo1';

export default class App extends React.Component {

  render() {
    return (
      <div className="App container">
        <h2 className="text-center">XX 公司季度销售量统计表</h2>
        <div style={{ margin: 15 }}>
          <Sheet />
        </div>

        {/* <h2 className="text-center">普通表格</h2>
        <div style={{ margin: 15 }}>
          <CTable />
        </div> */}
      </div>
    );
  }
}
