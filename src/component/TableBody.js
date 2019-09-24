import React from 'react';
import { getAscId }  from './util';
import { throttle } from 'throttle-debounce'; 

export default class TableBody extends React.Component {

  state = {
    recordsInView: []
  };

  constructor(props) {
    super(props);
    this.lazyRenderRows = throttle(500, this.lazyRenderRows);
  }

  getCellHeight(index) {
    const { showRowHeader, store } = this.props;
    const { rowGroup } = store;
    if (showRowHeader && rowGroup && rowGroup.length) {
      return rowGroup[index].computedHeight() - 1;
    }
    return 30;
  }

  get isUseMapData() {
    const { useMapData, store } = this.props;
    if (!Array.isArray(store.data) && useMapData) {
      return true;
    } 
    return false;
  }

  get rows() {
    const { rowGroup } = this.props.store;
    return rowGroup.length;
  }

  getMapData() {
    const { rowGroup, data, columns } = this.props.store;
    return rowGroup.map((row, rowIndex) => (
      <tr key={getAscId()}>
        {
          columns.map(column => {
            return (
              <td key={getAscId()}>
                <div className="cell" style={{height: this.getCellHeight(rowIndex)}}>
                  {data[row.prop][column.prop]}
                </div>
              </td>
            );
          })
        }
      </tr>
    )
      
    );
  }

  getLazyData() {
    const { store } = this.props;
    const { recordsInView } = this.state;
    return recordsInView.map((row, rowIndex) => {
      return (
        <tr key={getAscId()}>
          {
            store.columns.map(column => {
              return (
                <td key={getAscId()}>
                  <div className="cell" style={{height: this.getCellHeight(rowIndex)}}>
                    {row[column.prop]}
                  </div>
                </td>
              );
            })
          }
        </tr>
      );
    });
  }

  lazyRenderRows(recordsInView = []) {
    console.log('lazy render');
    if(recordsInView.length) {
      this.setState({recordsInView});
    }
  }

  render() {
    const { colHeaderWidth, store, lazyLoading } = this.props;
    const { recordsInView } = this.state;
    return lazyLoading
            ? <div style={{height: this.rows * 30}}>
                <table border="0" cellSpacing="0" style={{width: colHeaderWidth - (store.scrollY ? store.gutterWidth : 0)}} className="dc-table-real-body">
                  <colgroup>
                    {
                      store.columns.map((column, index) => (
                        <col width={column.realWidth} style={{ width: column.realWidth }} key={column.prop} />
                      ))
                    }
                  </colgroup>
                  <tbody>
                    {this.getLazyData()}
                  </tbody>
                </table>
              </div>
            : <table border="0" cellSpacing="0" style={{width: colHeaderWidth - (store.scrollY ? store.gutterWidth : 0)}} className="dc-table-real-body">
                <colgroup>
                  {
                    store.columns.map((column, index) => (
                      <col width={column.realWidth} style={{ width: column.realWidth }} key={column.prop} />
                    ))
                  }
                </colgroup>
                  <tbody>
                    {this.getMapData()}
                  </tbody>
              </table>
      }
  
}