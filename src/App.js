import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './component';
import mockReqData from './real-data';

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
            useMapData
            lazyLoading
            ref={n => window.tableEl = n}
            columnHeader={columnHeader.children}
            rowHeader={rowHeader.children}
            sortSameLevelColumn={true}
            resizeHeight={false}
            data={data}
            width={800}
            maxHeight={600}
            setting={setting}
            onLayoutChange={(d) => {
              localStorage.setItem('table', JSON.stringify(d));
            }}
          />
        </div>
        <div style={{marginBottom: 40}}></div>
        {/* <div style={{margin: 15}}>
          <h2>Disable resize</h2>
          <Table
            columnHeader={columnHeader}
            rowHeader={rowHeader}
            data={data}
            resizeWidth={false}
            resizeHeight={false}
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
