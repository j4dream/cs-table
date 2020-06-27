import React from 'react';
import './App.css';
import CSTable from './table/demo/demo1';

import Sheet from './sheet/demo/demo1';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h1>High performance table</h1>

        <div style={{ margin: 15 }}>
          <CSTable />
        </div>

        <h1>Sheet</h1>
        <div style={{ margin: 15 }}>
          <Sheet />
        </div>
      </div>
    );
  }
}
