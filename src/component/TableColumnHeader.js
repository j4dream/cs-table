import React from 'react';
import { getAscId }  from './util';
import Th from './Th';

export default class TableRowHeader extends React.Component {

  getColWidth(width) {
    if (width > 100) {
      return width;
    }
    return 100;
  }

  render() {
    //const { columnHeader } = this.state;
    const { border, colHeaderWidth, store } = this.props;
    const { columnHeader } = store;
    return (
      <table border="0" cellPadding="0" cellSpacing="0" style={{borderBottom: 0, width: colHeaderWidth}}>
        <colgroup>
          {
            store.columns.map((column, index) => (
              <col width={column.realWidth} style={{ width: column.realWidth }} key={index} />
            ))
          }
        </colgroup>
        <thead>
          {
            columnHeader.map( rs => (
              <tr key={getAscId()}>
                {
                  rs.map((c) => (
                      <Th type="col" column={c} key={getAscId()}/>
                    )
                  )
                }
                <th className="gutter-col" style={{ width: store.scrollY && store.scrollX ? store.gutterWidth : 0 }}></th>
              </tr>
            ))
          }
        </thead>
      </table>
    );
  }
}