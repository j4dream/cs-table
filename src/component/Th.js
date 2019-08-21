import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
// import Draggable, {DraggableCore} from 'react-draggable';
import Draggable from './Draggable';

export default class Th extends React.Component {

  static contextTypes = {
    table: PropTypes.any,
  };

  state = {
    style: {}
  };

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
            let targetNode;
            if (type === 'col') {
              targetNode = this.headerTree.getLastNode(column);
            }
            if (type === 'row') {
              const { level } = column;
              const index = level - 1;
              targetNode = this.headerTree.getDeepestNodeByIndex(index);
            }
            if (type === 'corner') {
              const { rowHeaderTree } = this.context.table;
              targetNode = rowHeaderTree.getDeepestNodeByIndex();
            }
            const calWidth = (targetNode.width || targetNode.realWidth) + offsetWidth;
            targetNode.width = calWidth < 100 ? 100 : calWidth;
            targetNode.realWidth = targetNode.width;
          }

          if (this.direction === 'vert') {
            const offsetHeight = event.clientY - startMouseTop;
            let targetNode;
            if (type === 'col') {
              const { level, rowSpan } = column;
              const index = level + rowSpan - 2;
              targetNode = this.headerTree.getDeepestNodeByIndex(index);
            }
            if (type === 'row') {
              targetNode = this.headerTree.getLastNode(column);          
            }
            if (type === 'corner') {
              const { colHeaderTree } = this.context.table;
              targetNode = colHeaderTree.getDeepestNodeByIndex();
            }
            const calHeight = targetNode.height + offsetHeight;
            targetNode.height = calHeight < 30 ? 30 : calHeight;
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

          this.context.table.onLayoutChange();

          this.context.table.scheduleLayout();
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

  get disableResizeCol() {
    const { resizeWidth } = this.context.table.props;
    if (!resizeWidth) {
      return true;
    }
    return false;
  }

  get disableResizeRow() {
    const { resizeHeight } = this.context.table.props;
    if (!resizeHeight) {
      return true;
    }
    return false;
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
        if (this.disableResizeCol) return;
        bodyStyle.cursor = 'col-resize';
        this.draggingColumn = column;
        this.direction = 'hori';
      } else if ( rect.height > 12 && rect.bottom - e.clientY < 5) {
        if (this.disableResizeRow) return;
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

  onMouseEnter = () => {
      const { column } = this.props;
      const { colHeaderTree } = this.context.table;
      if (colHeaderTree.sortingColumn) {
        if (colHeaderTree.sortSameLevelPos(column)) {
          this.context.table.refreshColumn();
        };
      }
      colHeaderTree.sortingColumn = null;
  }

  handleSortColumnStart = () => {
    const { column } = this.props;
    this.context.table.colHeaderTree.sortingColumn = column;
  }

  handleSortColumnStop = () => {
   // this.context.table.scheduleLayout();
   setTimeout(() => {
    const { colHeaderTree } = this.context.table; 
    colHeaderTree.sortingColumn = null;
   }, 200);
  }

  getEextraProps() {

  }

  render() {
    const { column, type } = this.props;
    const { style } = this.state;
    const { colSpan, rowSpan, name, children } = column;
    const { sortSameLevelColumn } = this.context.table.props;
    return (
      <th
        colSpan={colSpan}
        rowSpan={rowSpan}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.onMouseEnter}
        className={classnames({leaf: !children})}
        height={column.computedHeight()}
        style={style}
      >
        {
          sortSameLevelColumn && type === 'col'
            ? (
                <Draggable
                  handle=".icon"
                  axis="x"
                  onDragStart={this.handleSortColumnStart}
                  onDragStop={this.handleSortColumnStop}
                >
                  <div className="cell exchange">
                    <div className="icon">

                    </div>
                    {name}
                  </div>
                </Draggable>
              )
            : (
              <div className="cell">{name}</div>
            )
        }
      </th>
    );
  }
}