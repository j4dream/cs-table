import React from 'react';
import { convertToRowHeader, getAscId }  from './util';
import Th from './Th';

export default class TableRowHeader extends React.Component {

  render() {
    const { store, tree } = this.props;
    const { rowTableColGroup, rowHeader, rowHeaderWidth } = store;
    return (
      <table border="0" cellSpacing="0" style={{width: rowHeaderWidth}}>
        <colgroup>
          {
            rowTableColGroup.map(({width}, index) => (
              <col width={width} style={{ width }} key={index} />
            ))
          }
        </colgroup>
        <thead>
          {
            rowHeader.map( rs => (
              <tr key={getAscId()}>
                {
                  rs.map(c => <Th type="row" column={c} key={getAscId()}/>)
                }
              </tr>
            ))
          }
          {
            store.scrollX && store.scrollY && (
              <tr>
                <th className="gutter-row" colSpan={tree.deepestNodePath.length} height="17">

                </th>
              </tr>
            )
          }
        </thead>
      </table>
    );
  }
}