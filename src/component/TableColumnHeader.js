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

  get gutterWidth() {
    const { forceHideYGutter, scrollY, gutterWidth } = this.props.store;
    if (forceHideYGutter || !scrollY) {
      return 0;
    }
    return gutterWidth;
  }

  render() {
    const { colHeaderWidth, store } = this.props;
    const { columnHeader } = store;
    return (
      <table border="0" cellPadding="0" cellSpacing="0" style={{borderBottom: 0, width: colHeaderWidth}}>
        <colgroup>
          {
            store.columns.map(({realWidth, prop}) => (
              <col width={realWidth} style={{ width: realWidth }} key={prop} />
            ))
          }
        </colgroup>
        <thead>
          {
            columnHeader.map( rs => (
              <tr key={getAscId()}>
                {
                  rs.map((c) => (
                      <Th type="col" column={c} key={c.prop}/>
                    )
                  )
                }
                <th className="gutter-col" style={{ width: this.gutterWidth}}></th>
              </tr>
            ))
          }
        </thead>
      </table>
    );
  }
}