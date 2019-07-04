import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Th extends React.Component {

  static contextTypes = {
    table: PropTypes.any,
  };

  handleClick = () => {
    const { type } = this.props;
    if (type === 'col') {
      this.colClick();
    }
    if (type === 'row') {
      this.rowClick();
    }
  }

  colClick = () => {
    const { level, rowSpan } = this.props.column;
    const index = level + rowSpan - 2;
    console.log(this.headerTree.getDeepesetNodeByIndex(index));
  }

  rowClick = () => {
    const { level, rowSpan } = this.props.column;
    console.log(this.props.column);
  }

  handleMouseDown = (e) => {
    const { column, type } = this.props;
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
      
      if (this.direction === 'hori') {
        colResizeProxy.style.visibility = 'visible';
        colResizeProxy.style.left = startLeft + 'px';
      }

      const startTop =  thRect.bottom - tableTop;
      if (this.direction === 'vert') {
        rowResizeProxy.style.visibility = 'visible';
        rowResizeProxy.style.top = startTop + 'px';
      }
 
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
          if (this.direction === 'hori') {
            const offsetWidth = event.clientX - startMouseLeft;
            if (type === 'col') {
              const lastColumn = this.headerTree.getLastNode(column);
              const calWidth = lastColumn.width + offsetWidth;
              lastColumn.width = calWidth < 100 ? 100 : calWidth;
            }
            if (type === 'row') {
              const { level } = column;
              const index = level - 1;
              const targetNode = this.headerTree.getDeepesetNodeByIndex(index);
              const calWidth = targetNode.width + offsetWidth;
              targetNode.width = calWidth < 100 ? 100 : calWidth;
            }
          }

          if (this.direction === 'vert') {
            const offsetHeight = event.clientY - startMouseTop;
            if (type === 'col') {
              const { level, rowSpan } = column;
              const index = level + rowSpan - 2;
              const targetNode = this.headerTree.getDeepesetNodeByIndex(index);
              
              const calHeight = targetNode.height + offsetHeight;
              targetNode.height = calHeight < 30 ? 30 : calHeight;
            }
            if (type === 'row') {
              const targetNode = this.headerTree.getLastNode(column);
              const calHeight = targetNode.height + offsetHeight;
              targetNode.height = calHeight < 30 ? 30 : calHeight;
            }
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


  get headerTree() {
    const { type } = this.props;
    if (type === 'row') {
      return this.context.table.rowHeaderTree;
    }
    if (type === 'col') {
      return this.context.table.colHeaderTree;
    }
    return {};
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
        this.direction = 'hori';
      } else if ( rect.height > 12 && rect.bottom - e.clientY < 5) {
        bodyStyle.cursor = 'row-resize';
        this.direction = 'vert';
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

  getEextraProps() {

  }

  render() {
    const { column } = this.props;
    const { colSpan, rowSpan, name, children } = column;

    return (
      <th
        colSpan={colSpan}
        rowSpan={rowSpan}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
        className={classnames({leaf: !children})}
        height={column.computedHeight()}
      >
        {name}
      </th>
    );
  }
}