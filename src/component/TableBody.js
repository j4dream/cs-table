import React from 'react';
import { getAscId } from './util';
import { throttle } from 'throttle-debounce';

export default class TableBody extends React.Component {
  static defaultProps = {
    rowsInView: 20,
  };

  state = {
    recordsInView: [],
    offsetIndex: 0,
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

  get rows() {
    const { rowGroup } = this.props.store;
    return rowGroup.length;
  }

  getMapData() {
    const { rowGroup, data, columns } = this.props.store;
    if (this.props.isNoData) {
      return <tr></tr>;
    }
    return rowGroup.map((row, rowIndex) => (
      <tr key={getAscId()}>
        {columns.map((column) => {
          return (
            <td key={getAscId()}>
              <div className="cell" style={{ height: this.getCellHeight(rowIndex) }}>
                {data[row.prop] && data[row.prop][column.prop]}
              </div>
            </td>
          );
        })}
      </tr>
    ));
  }

  getLazyData() {
    const { store, isNoData } = this.props;
    const { recordsInView } = this.state;
    if (isNoData) {
      return <tr></tr>;
    }
    return recordsInView.map((row, rowIndex) => {
      return (
        <tr key={getAscId()}>
          {store.columns.map((column) => {
            return (
              <td key={getAscId()}>
                <div className="cell" style={{ height: this.getCellHeight(rowIndex) }}>
                  {row && row[column.prop]}
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  lazyRenderRows(offsetIndex = 0) {
    const { rowGroup, data } = this.props.store;
    if (rowGroup.length) {
      const recordsInView = [];
      for (let i = 0; i < this.props.rowsInView; i++) {
        const rowHeaderItem = rowGroup[offsetIndex + i];
        if (rowHeaderItem) {
          const rowProp = rowHeaderItem.prop;
          const row = data[rowProp];
          recordsInView.push(row);
        }
      }
      this.setState({ recordsInView, offsetIndex });
    }
  }

  render() {
    const { colHeaderWidth, store, lazyLoading, isNoData } = this.props;
    const { offsetIndex } = this.state;
    return lazyLoading ? (
      <div style={{ height: isNoData ? 0 : this.rows * 30 }}>
        <table
          border="0"
          cellSpacing="0"
          style={{
            width: colHeaderWidth - (store.scrollY ? store.gutterWidth : 0),
            transform: `translate(0, ${offsetIndex * 30}px)`,
          }}
          className="dc-table-real-body"
        >
          <colgroup>
            {store.columns.map((column, index) => (
              <col width={column.realWidth} style={{ width: column.realWidth }} key={column.prop} />
            ))}
          </colgroup>
          <tbody>{this.getLazyData()}</tbody>
        </table>
      </div>
    ) : (
      <table
        border="0"
        cellSpacing="0"
        style={{ width: colHeaderWidth - (store.scrollY ? store.gutterWidth : 0) }}
        className="dc-table-real-body"
      >
        <colgroup>
          {store.columns.map((column, index) => (
            <col width={column.realWidth} style={{ width: column.realWidth }} key={column.prop} />
          ))}
        </colgroup>
        <tbody>{this.getMapData()}</tbody>
      </table>
    );
  }
}
