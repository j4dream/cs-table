import React from 'react';
import { getAscId }  from './util';
import Th from './Th';

export default class TableRowHeader extends React.Component {

  render() {
    const { store, tree } = this.props;
    const { rowTableColGroup, rowHeader, rowHeaderWidth } = store;
    return (
      <table border="0" cellSpacing="0" style={{width: rowHeaderWidth}}>
        <colgroup>
          {
            rowTableColGroup.map(({realWidth}, index) => (
              <col width={realWidth} style={{ realWidth }} key={index} />
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
            store.scrollX && (
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