import React from 'react';
import PropTypes from 'prop-types';
import TableColumnHeader from './TableColumnHeader';
import TableRowHeader from './TableRowHeader';
import TableBody from './TableBody';
import { convertToColumnHeader, convertToRowHeader } from './util';
import Tree from './tree';
import Node from './node';
import Th from './Th';

import './style.css';
import { isNumber } from 'util';

export default class Table extends React.Component {

  static defaultProps = {
    border: 1,
    width: 100
  }

  state = {
    columns: [],
    rowGroup: [],
    rowTableColGroup: [],
    data: [],
    layout: {},
    rowHeaderWidth: 0,
    colHeaderHeight: 0,
    bodyWrapperHeight: 0,
    columnHeader: [],
    rowHeader: []
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
    const { columnHeader, rowHeader } = props;
    window.colHeaderTree = this.colHeaderTree = new Tree(columnHeader);
    window.rowHeaderTree = this.rowHeaderTree = new Tree(rowHeader);
    window.cornerNode = this.cornerNode = new Node({name: 'corner'});
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
    const rowHeaderWidth = this.state.rowTableColGroup.reduce((acc, col) => acc + (col.width || col.minWidth), -1);
    const bodyMinWidth = this.state.columns.reduce((acc, col) => acc + (col.width || col.minWidth), 0);

    this.state.colHeaderWidth = bodyMinWidth;
    this.state.rowHeaderWidth = rowHeaderWidth;
  }

  calculateHeight() {
    this.setState(state => {
      const { colHeaderWrapper } = this;
      const colHeaderHeight = colHeaderWrapper.clientHeight;
      const { height } = this.props;
      let bodyWrapperHeight = '100%';

      if (height && isNumber(height)) {
        bodyWrapperHeight = this.props.height - colHeaderHeight;
      }

      this.cornerNode.height = colHeaderHeight;
       
      return {
        colHeaderHeight,
        bodyWrapperHeight
      }
      
    });
  }

  componentWillMount() {
    const { data } = this.props;
    const columns = this.colHeaderTree.getLeafNodes();
    const rowGroup = this.rowHeaderTree.getLeafNodes();
    const rowTableColGroup = this.rowHeaderTree.deepesetNodePath;
    const columnHeader = convertToColumnHeader(this.colHeaderTree.root.children);
    const rowHeader = convertToRowHeader(this.rowHeaderTree.root.children);
    this.setState({
      columns,
      rowGroup,
      rowTableColGroup,
      columnHeader,
      rowHeader,
      data
    });
  }

  get tableWidth() {
    const { width } = this.props;
    if (width > 200) {
      return width
    }
    return '100%';
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
          className="corner-block"
          style={{
            width: rowHeaderWidth + 1,
            height: colHeaderHeight - 1
          }}
        >
          <table border="0" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <Th type="corner" column={this.cornerNode}/>
              </tr>
            </thead>
          </table>
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