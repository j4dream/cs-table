import React from 'react';
import { convertToRowHeader, getAscId }  from './util';
import Th from './Th';

export default class TableRowHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnHeader: convertToRowHeader(props.rowHeader)
    };
  }

  render() {
    const { store } = this.props;
    const { rowTableColGroup, rowHeader } = store;
    return (
      <table border="0" cellSpacing="0">
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
        </thead>
      </table>
    );
  }
}