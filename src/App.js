import React from 'react';
import './App.css';
import CTable from './ctable/demo/demo1';

import Sheet from './stable/demo/demo1';

export default class App extends React.Component {

  render() {
    return (
      <div className="App container">
        <h1>High performance table</h1>

        <div style={{ margin: 15 }}>
          <CTable />
        </div>

        <h1>Sheet</h1>
        <div style={{ margin: 15 }}>
          <Sheet />
        </div>
      </div>
    );
  }
}
