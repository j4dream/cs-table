import React from 'react';
import PropTypes from 'prop-types';
import TableStore from './TableStore';
import TableColumnHeader from './TableColumnHeader';
import TableRowHeader from './TableRowHeader';
import TableBody from './TableBody';
import { getLeafColumns } from './util';

import './style.css';

export default class Table extends React.Component {

  static defaultProps = {
    border: 1,
    width: 100
  }

  state = {
    columns: [],
    rowWidth: [40, 50, 60],
    data: [],
    layout: {},
    rowHeaderWidth: 0
  }

  static childContextTypes = {
    table: PropTypes.any,
  };

  getChildContext() {
    return {
      table: this,
    }
  }

  constructor(props) {
    super(props);
    this.store = new TableStore(props);
  }

  bindRef(key) {
    return (node) => { this[key] = node; }
  }

  scheduleLayout() {
    this.calculateColumnWidth();
    this.forceUpdate();
  }

  calculateColumnWidth() {
    const cw = this.rowHeaderEl.clientWidth;
    this.state.rowHeaderWidth = cw - 1;
  }

  componentWillMount() {
    const { data, columnHeader } = this.props;
    const columns = getLeafColumns(columnHeader);
    this.setState({
      columns,
      data
    });
  }

  componentDidMount() {
    this.scheduleLayout();
  }

  render() {
    const { rowHeaderWidth } = this.state;
    return (
      <div
        ref={this.bindRef('tableEl')}
        className="dc-table"
      >
        <div
          style={{
            marginLeft: rowHeaderWidth
          }}
        >
          <TableColumnHeader
            {...this.props}
            store={this.state}
          />
          <TableBody
            {...this.props}
            store={this.state}
          />
        </div>
        <div
          className="dc-table-rowheader-wrapper"
          ref={this.bindRef('rowHeaderEl')}
        >
          <TableRowHeader
            {...this.props}
            store={this.state}
          />
        </div>
        <div
          className="dc-table-col-resize-proxy"
          ref={this.bindRef('colResizeProxy')}
          style={{ visibility: 'hidden' }}
        />
        <div
          className="dc-table-row-resize-proxy"
          ref={this.bindRef('rowResizeProxy')}
          style={{ visibility: 'hidden' }}
        />
      </div>
    );
  }
}