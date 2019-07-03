import React from 'react';
import PropTypes from 'prop-types';
import TableColumnHeader from './TableColumnHeader';
import TableRowHeader from './TableRowHeader';
import TableBody from './TableBody';
import { getLeafColumns, convertToColumnHeader } from './util';
import Tree from './tree';

import './style.css';
import { isNumber } from 'util';

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
    rowHeaderWidth: 0,
    colHeaderHeight: 0,
    bodyWrapperHeight: 0,
    columnHeader: []
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
    const { columnHeader } = props;
    window.colHeaderTree = this.colHeaderTree = new Tree(columnHeader);
  }

  bindRef(key) {
    return (node) => { this[key] = node; }
  }

  handleScroll = () => {
    const { bodyWrapper, colHeaderWrapper, rowHeaderWrapper } = this;
    colHeaderWrapper.scrollLeft = bodyWrapper.scrollLeft;
    rowHeaderWrapper.scrollTop = bodyWrapper.scrollTop;

  }

  scheduleLayout() {
    this.calculateWidth();
    this.forceUpdate(() => {
      this.calculateHeight();
    });
  }

  calculateWidth() {
    const cw = this.rowHeaderWrapper.clientWidth;
    this.state.rowHeaderWidth = cw - 1;

    const bodyMinWidth = this.state.columns.reduce((acc, col) => acc + (col.width || col.minWidth), 0);

    let bodyWidth = this.tableEl.clientWidth;
    bodyWidth = Math.max(bodyMinWidth, bodyWidth)
    this.state.colHeaderWidth = bodyWidth;
  }

  calculateHeight() {
    this.setState(state => {
      const { colHeaderWrapper } = this;
      const colHeaderHeight = colHeaderWrapper.clientHeight;
      const bodyWrapperHeight = this.props.height - colHeaderHeight;
      return {
        colHeaderHeight,
        bodyWrapperHeight
      }
      
    });
  }

  componentWillMount() {
    const { data } = this.props;
    const columns = this.colHeaderTree.getLeafNodes();
    const columnHeader = convertToColumnHeader(this.colHeaderTree.root.children);
    this.setState({
      columns,
      columnHeader,
      data
    });
  }

  get tableWidth() {
    const { width } = this.props;
    if (width > 200) {
      return width
    }
    return 200;
  }

  get colTabelWidth() {

  }

  componentDidMount() {
    this.scheduleLayout();
  }
  

  render() {
    const {
      rowHeaderWidth,
      colHeaderWidth,
      colHeaderHeight,
      bodyWrapperHeight,
    } = this.state;
    const { height } = this.props;
    return (
      <div
        ref={this.bindRef('tableEl')}
        className="dc-table"
        style={{
          height,
          width: this.tableWidth,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            marginLeft: rowHeaderWidth
          }}
        >
          <div ref={this.bindRef('colHeaderWrapper')} className="col-header-wrapper">
            <TableColumnHeader
              {...this.props}
              store={this.state}
              colHeaderWidth={colHeaderWidth}
            />
          </div>
          <div ref={this.bindRef('bodyWrapper')} style={{height: bodyWrapperHeight}} className="body-wrapper" onScroll={this.handleScroll}>
            <TableBody
              {...this.props}
              store={this.state}
              colHeaderWidth={colHeaderWidth}
            />
          </div>
        </div>
        <div
          className="row-header-wrapper"
          ref={this.bindRef('rowHeaderWrapper')}
          style={{
            marginTop: colHeaderHeight,
            height: bodyWrapperHeight
          }}
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