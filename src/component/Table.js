import React from 'react';
import PropTypes from 'prop-types';
import TableColumnHeader from './TableColumnHeader';
import TableRowHeader from './TableRowHeader';
import TableBody from './TableBody';
import { convertToColumnHeader, convertToRowHeader, getScrollBarWidth } from './util';
import Tree from './tree';
import Node from './node';
import Th from './Th';

import './style.css';
import { isNumber } from 'util';

export default class Table extends React.Component {

  static defaultProps = {
    border: 1,
    width: 100,
    setting: {},
    resizeWidth: true,
    resizeHeight: true,
    showColumnHeader: true,
    showRowHeader: true,
    data: [],
    columnHeader: [],
    rowHeader: [],
    className: ''
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
    rowHeader: [],
    gutterWidth: getScrollBarWidth(), // scrollBar width
    scrollX: null, // has x scroll bar
    scrollY: null, // has y scroll bar
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
    const { columnHeader, rowHeader, setting } = props;
    const { r, c } = setting || {};
    this.colHeaderTree = new Tree(columnHeader, c);
    this.rowHeaderTree = new Tree(rowHeader, r);
    this.cornerNode = new Node({name: ''});
  }

  bindRef(key) {
    return (node) => { this[key] = node; }
  }

  handleScroll = () => {
    const { bodyWrapper, colHeaderWrapper, rowHeaderWrapper, showRowHeader } = this;
    if (this.showColumnHeader) {
      colHeaderWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }
    if (showRowHeader) {
      rowHeaderWrapper.scrollTop = bodyWrapper.scrollTop;
    }
  }

  scheduleLayout() {
    this.calculateWidth();
    this.forceUpdate(() => {
      this.calculateHeight();
      this.updateScrollY();
    });
  }

  calculateWidth() {
    const { columns, rowTableColGroup, gutterWidth } = this.state;

    const bodyMinWidth = columns.reduce((acc, col) => acc + (col.width || col.minWidth), 0);
    const tableElWidth = this.tableEl.clientWidth;

    this.state.colHeaderWidth = bodyMinWidth;
    if (this.showRowHeader) {
      const rowHeaderWidth = rowTableColGroup.reduce((acc, col) => acc + (col.width || col.minWidth), 0);
      this.state.rowHeaderWidth = rowHeaderWidth;
    } else {
      this.state.rowHeaderWidth = 0;
    }

    const flexColumns = columns.filter(col => typeof col.width !== 'number');

    this.state.scrollX = bodyMinWidth > (tableElWidth - this.state.rowHeaderWidth - gutterWidth);

    if (flexColumns.length) {
      const totalFlexWidth = tableElWidth - this.state.rowHeaderWidth - gutterWidth- bodyMinWidth;
      if (totalFlexWidth > 0) {
        if (flexColumns.length === 1) {
          flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth;
        } else {
          const allColumnsWidth = flexColumns.reduce((pre, col) => pre + col.minWidth, 0);
          const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;

          let widthWithoutFirst = 0;

          flexColumns.forEach((column, index) => {
            if (index === 0) return;
            const flexWidth = Math.floor(column.minWidth * flexWidthPerPixel);
            widthWithoutFirst += flexWidth;
            column.realWidth = column.minWidth + flexWidth;
          });

          flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth - widthWithoutFirst;

        }
      }
    }
  }

  calculateHeight() {
    this.setState(state => {
      const { colHeaderWrapper } = this;
      let colHeaderHeight;
      if (this.props.showColumnHeader) {
        colHeaderHeight = colHeaderWrapper.clientHeight;
      } else {
        colHeaderHeight = 0;
      }     
      const { height, maxHeight } = this.props;
      let bodyWrapperHeight = '100%';

      if (height && isNumber(height)) {
        bodyWrapperHeight = this.props.height - colHeaderHeight;
      }

      if (maxHeight && isNumber(maxHeight)) {
        bodyWrapperHeight = this.props.maxHeight - colHeaderHeight;
      }

      this.cornerNode.height = colHeaderHeight;
       
      return {
        colHeaderHeight,
        bodyWrapperHeight
      }
      
    });
  }

  updateScrollY() {
    this.setState((state) => {
      const { bodyWrapper } = this;
     
      const body = bodyWrapper.querySelector('.dc-table-real-body');
      const scrollY = body.clientHeight > state.bodyWrapperHeight;

      return {
        scrollY
      };
    });
  }

  get tableWidth() {
    const { width } = this.props;
    if (width > 200) {
      return width
    }
    return '100%';
  }

  get tableHeight() {
    const { height, maxHeight } = this.props;
    const style = {};

    if (height) {
      style.height = height || '';
    } else if (maxHeight) {
      style.maxHeight = maxHeight;
    }

    return style;
  }

  get bodyHeightOrMaxHeight() {
    const { height, maxHeight } = this.props;
    const { bodyWrapperHeight } = this.state;
    const style = {};
    if (height) {
      style.height = bodyWrapperHeight || '';
    } else if (maxHeight) {
      style.maxHeight = bodyWrapperHeight;
    }
    return style;
  }

  get showCorner() {
    const { showColumnHeader, showRowHeader } = this.props;
    const { columns, rowGroup } = this.state;
    return (
      showColumnHeader &&
      showRowHeader &&
      Boolean(columns.length) &&
      Boolean(rowGroup.length)
    );
  }

  get showRowHeader() {
    const { showRowHeader } = this.props;
    const { rowGroup } = this.state;
    return (
      showRowHeader &&
      Boolean(rowGroup.length)
    );
  }

  get showColumnHeader() {
    return this.props.showColumnHeader;
  }
 
  getConfig() {
    const { rowHeaderTree, colHeaderTree, props, tableWidth } = this;
    const { height } = props;
    const colConfig = {},
          rowConfig = {};

    colHeaderTree.deepestNodePath.forEach(({prop, height}) => {
      let cell = colConfig[prop];
      if (!cell) {
        cell = {};
      }
      cell.height = height;
      colConfig[prop] = cell;
    });

    colHeaderTree.leafNodes.forEach(({prop, width}) => {
      let cell = colConfig[prop];
      if (!cell) {
        cell = {};
      }
      cell.width = width;
      colConfig[prop] = cell;
    });

    rowHeaderTree.deepestNodePath.forEach(({prop, width}) => {
      let cell = rowConfig[prop];
      if (!cell) {
        cell = {};
      }
      cell.width = width;
      rowConfig[prop] = cell;
    });

    rowHeaderTree.leafNodes.forEach(({prop, height}) => {
      let cell = rowConfig[prop];
      if (!cell) {
        cell = {};
      }
      cell.height = height;
      rowConfig[prop] = cell;
    });

    return {
      w: tableWidth,
      h: height,
      c: colConfig,
      r: rowConfig
    };
  }

  onResizeCell() {
    this.scheduleLayout();
    this.props.onResizeCell && this.props.onResizeCell(this.getConfig());
  }

  refreshTable(data) {
    const columns = this.colHeaderTree.leafNodes;
    const rowGroup = this.rowHeaderTree.leafNodes;
    const rowTableColGroup = this.rowHeaderTree.deepestNodePath;
    const columnHeader = convertToColumnHeader(this.colHeaderTree.root.children);
    const rowHeader = convertToRowHeader(this.rowHeaderTree.root.children);
    this.setState({
      columns,
      rowGroup,
      rowTableColGroup,
      columnHeader,
      rowHeader,
      data
    }, this.scheduleLayout);
  }

  componentDidMount() {
    const { data } = this.props;
    this.refreshTable(data);
  }

  componentWillReceiveProps({columnHeader, rowHeader, data, showColumnHeader, showRowHeader}) {
    if (this.props.columnHeader === columnHeader && this.props.rowHeader === rowHeader && this.props.data === data) {
      return;
    } else {
      const { r, c } = this.props.setting || {};
      this.colHeaderTree = new Tree(columnHeader, c);
      this.rowHeaderTree = new Tree(rowHeader, r);
      this.refreshTable(data);
    }
  }

  render() {
    const {
      rowHeaderWidth,
      colHeaderWidth,
      colHeaderHeight,
      data
    } = this.state;
    const { className } = this.props;
    
    return (
      <div
        ref={this.bindRef('tableEl')}
        className={`dc-table ${className}`}
        style={
          Object.assign({
              width: this.tableWidth,
              overflow: 'hidden'
            },
            this.tableHeight
          )
        }
      >
        <div
          style={{
            marginLeft: rowHeaderWidth
          }}
          ref={this.bindRef('colBodyWrapper')}
        >
          {
            this.showColumnHeader && (
              <div ref={this.bindRef('colHeaderWrapper')} className="col-header-wrapper">
                <TableColumnHeader
                  {...this.props}
                  store={this.state}
                  colHeaderWidth={colHeaderWidth}
                />
              </div>
            )
          }
          <div ref={this.bindRef('bodyWrapper')} style={this.bodyHeightOrMaxHeight} className="body-wrapper" onScroll={this.handleScroll}>
            <TableBody
              {...this.props}
              store={this.state}
              colHeaderWidth={colHeaderWidth}
            />
            {
              (!data || !data.length) && (
                <div
                  style={this.bodyHeightOrMaxHeight}
                  className="nodata-block"
                >
                  <div className="nodata-text">No Data</div>
                </div>
              )
            }
          </div>
        </div>
        {
          this.showRowHeader && (
            <div
              className="row-header-wrapper"
              ref={this.bindRef('rowHeaderWrapper')}
              style={{
                marginTop: colHeaderHeight,
                ...this.bodyHeightOrMaxHeight
              }}
            >
              <TableRowHeader
                {...this.props}
                store={this.state}
                tree={this.rowHeaderTree}
              />
            </div>
          )
        }
        
        {
          this.showCorner && (
            <div
              className="corner-block"
              style={{
                width: rowHeaderWidth,
                height: colHeaderHeight
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
          )
        }
        
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