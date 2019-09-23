import React from 'react';
import { getAscId }  from './util';

export default class TableBody extends React.Component {

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

  getArrayData() {
    const { store } = this.props;
    return store.data.map((row, rowIndex) => {
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

  render() {
    const { colHeaderWidth, store } = this.props;
     
    return (
      <table border="0" cellSpacing="0" style={{width: colHeaderWidth - (store.scrollY ? store.gutterWidth : 0)}} className="dc-table-real-body">
        <colgroup>
          {
            store.columns.map((column, index) => (
              <col width={column.realWidth} style={{ width: column.realWidth }} key={column.prop} />
            ))
          }
        </colgroup>
        <tbody>
          {
            this.isUseMapData
              ? this.getMapData()
              : this.getArrayData()
          }
        </tbody>
      </table>
    );
  }
}