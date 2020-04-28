import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './component';
import data from './data';
import CSTable from './table/demo/demo1';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>

        <div style={{margin: 15}}>
          <CSTable />
        </div>

        {/* <div style={{margin: 15}}>
          <h2>Data gird, supoort drag & drop， nested header, resize width & height </h2>
          <Table
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            sortSameLevelColumn={true}
          />
        </div>
        <div style={{margin: 15}}>
          <h2>Hide header</h2>
          <Table
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            resizeWidth={false}
            showRowHeader={false}
          />
        </div>
        <div style={{margin: 15}}>
          <h2>Width && MaxHeight</h2>
          <Table
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            width={500}
            maxHeight={250}
          />
        </div> */}
      </div>
    );
  }
};
