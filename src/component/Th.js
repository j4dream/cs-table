import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Th extends React.Component {

  static contextTypes = {
    table: PropTypes.any,
  };

  handleMouseDown = (e) => {
    const { column } = this.props;
    if (this.draggingColumn) {
      this.dragging = true;
      const { table } = this.context;
      const { tableEl, colResizeProxy, rowResizeProxy } = table;
      const tableRect = tableEl.getBoundingClientRect();
      const { left:tableLeft, top:tableTop } = tableRect;
      let thEl = e.target;
      while (thEl && thEl.tagName !== 'TH') {
        thEl = thEl.parentNode;
      }
      const thRect = thEl.getBoundingClientRect();
      const minLeft = thRect.left - tableLeft + 30;
      const minTop = thRect.top - tableTop + 30;

      const startMouseLeft = e.clientX;
      const startMouseTop = e.clientY;
      const startLeft = thRect.right - tableLeft;
      const startColumnLeft = thRect.left - tableLeft;

      colResizeProxy.style.visibility = 'visible';
      colResizeProxy.style.left = startLeft + 'px';


      const startTop =  thRect.bottom - tableTop;
      const startColumnTop = thRect.top - tableTop;

      rowResizeProxy.style.visibility = 'visible';
      rowResizeProxy.style.top = startTop + 'px';

      document.onselectstart = () => false;
      document.ondragstart = () => false;

      const handleMouseMove = (event) => {
        const deltaLeft = event.clientX - startMouseLeft;
        const proxyLeft = startLeft + deltaLeft;
        colResizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';

        const deltaTop = event.clientY - startMouseTop;
        const proxyTop = startTop + deltaTop;
        rowResizeProxy.style.top = Math.max(minTop, proxyTop) + 'px';
      };

      const handleMouseUp = (event) => {
        if (this.dragging) {
          if (this.direction === 'col') {
            const finalLeft = parseInt(colResizeProxy.style.left, 10);
            const columnWidth = finalLeft - startColumnLeft;
            //const oldWidth = column.realWidth;
            column.width = column.realWidth = columnWidth;
          }

          if (this.direction === 'row') {
            const finalTop = parseInt(rowResizeProxy.style.top, 10);
            const columnTop = finalTop - startColumnTop;
            column.height = columnTop;
          }

          this.dragging = false;
          this.draggingColumn = null;

          document.body.style.cursor = '';
          colResizeProxy.style.visibility = 'hidden';
          rowResizeProxy.style.visibility = 'hidden';
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;

          this.context.table.scheduleLayout();
          //this.dispatchEvent('onHeaderDragEnd', columnWidth, oldWidth, column, event);
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

  handleMouseMove = (e) => {
    const { column } = this.props;
    if (!this.dragging) {
      let target = e.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      const rect = target.getBoundingClientRect();
      const bodyStyle = document.body.style;

      if (rect.width > 12 && rect.right - e.pageX < 5) {
        bodyStyle.cursor = 'col-resize';
        this.draggingColumn = column;
        this.direction = 'col';
      } else if ( rect.height > 12 && rect.bottom - e.clientY < 5) {
        bodyStyle.cursor = 'row-resize';
        this.direction = 'row';
        this.draggingColumn = column;
      } else {
        bodyStyle.cursor = '';
        this.draggingColumn = null;
        this.direction = null;
      }
    }
  }

  handleMouseOut() {
    document.body.style.cursor = "";
  }

  render() {
    const { colSpan, rowSpan, name, children, height } = this.props.column;
    return (
      <th
        colSpan={colSpan}
        rowSpan={rowSpan}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.handleMouseDown}
        className={classnames({leaf: !children})}
        height={height}
      >
        {name}
      </th>
    );
  }
}