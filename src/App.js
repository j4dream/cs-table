import React from 'react';
import './App.css';
import Table from './component';
import data from './data';
import CSTable from './table/demo/demo1';

import Sheet from './sheet/demo/demo1';

export default class App extends React.Component {

  state = {
    rowHeader: data.rowHeader,
    columnHeader: data.columnHeader,
    data: data.data,
  }


  render() {
    const {
      columnHeader,
      rowHeader,
      data,
    } = this.state;
    return (
      <div className="App">
        <h1>High performance table</h1>

        <div style={{margin: 15}}>
          <CSTable />
        </div>

        <h1>Sheet</h1>
        <div style={{margin: 15}}>
          <Sheet />
        </div>
        {/* <Table
          columnHeader={columnHeader}
          rowHeader={rowHeader}
          data={data}
        /> */}
      </div>
    );
  }
};
