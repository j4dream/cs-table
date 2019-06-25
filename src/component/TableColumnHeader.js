import React from 'react';
import { convertToColumnHeader, getAscId }  from './util';
import Th from './Th';

export default class TableRowHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnHeader: convertToColumnHeader(props.columnHeader)
    };
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
                  rs.map((c) => (
                      <Th column={c} key={getAscId()}/>
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