import React from 'react';
import { convertToColumnHeader, getAscId }  from './util';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TableRowHeader extends React.Component {

  static contextTypes = {
    table: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      columnHeader: convertToColumnHeader(props.columnHeader)
    };
  }

  handleMouseDown(column, e) {
    if (this.draggingColumn) {
      this.dragging = true;
      const { table } = this.context;
      const { tableEl, resizeProxy } = table;
      const tableLeft = tableEl.getBoundingClientRect().left;
      let thEl = e.target;
      while (thEl && thEl.tagName !== 'TH') {
        thEl = thEl.parentNode;
      }
      const thRect = thEl.getBoundingClientRect();
      const minLeft = thRect.left - tableLeft + 30;

      const startMouseLeft = e.clientX;
      const startLeft = thRect.right - tableLeft;
      const startColumnLeft = thRect.left - tableLeft;

      resizeProxy.style.visibility = 'visible';
      resizeProxy.style.left = startLeft + 'px';

      document.onselectstart = () => false;
      document.ondragstart = () => false;

      const handleMouseMove = (event) => {
        const deltaLeft = event.clientX - startMouseLeft;
        const proxyLeft = startLeft + deltaLeft;

        resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
      };

      const handleMouseUp = (event) => {
        if (this.dragging) {
          const finalLeft = parseInt(resizeProxy.style.left, 10);
          const columnWidth = finalLeft - startColumnLeft;
          const oldWidth = column.realWidth;
          column.width = column.realWidth = columnWidth;

          this.dragging = false;
          this.draggingColumn = null;

          document.body.style.cursor = '';
          resizeProxy.style.visibility = 'hidden';
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;

          this.context.table.scheduleLayout();
          this.dispatchEvent('onHeaderDragEnd', columnWidth, oldWidth, column, event);
        }
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }

  dispatchEvent(name, ...args) {
    const fn = this.props[name];
    fn && fn(...args);
  }

  handleMouseMove(column, e) {
    if (!this.dragging) {
      let target = e.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      const rect = target.getBoundingClientRect();
      const bodyStyle = document.body.style;

      if (rect.width > 12 && rect.right - e.pageX < 8) {
        bodyStyle.cursor = 'col-resize';
        this.draggingColumn = column;
      } else {
        bodyStyle.cursor = '';
        this.draggingColumn = null;
      }
    }
  }

  handleMouseOut() {
    document.body.style.cursor = "";
  }

  render() {
    const { columnHeader } = this.state;
    const { border, width, store } = this.props;
    return (
      <table border={border} cellSpacing="0">
        <colgroup>
          {
            store.columns.map((column, index) => (
              <col width={column.width} style={{ width: column.width }} key={index} />
            ))
          }
        </colgroup>
        <thead>
          {
            columnHeader.map( rs => (
              <tr key={getAscId()}>
                {
                  rs.map((c, index) => (
                      <th
                        onMouseMove={this.handleMouseMove.bind(this, c)}
                        onMouseDown={this.handleMouseDown.bind(this, c)}
                        onMouseOut={this.handleMouseOut}
                        colSpan={c.colSpan}
                        rowSpan={c.rowSpan}
                        key={getAscId()}
                        className={classnames({leaf: !c.children})}
                      >
                        {c.name}
                      </th>
                    )
                  )
                }
              </tr>
            ))
          }
        </thead>
      </table>
    );
  }
}