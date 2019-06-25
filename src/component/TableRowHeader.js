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
    const { columnHeader } = this.state;
    const { border, width, store } = this.props;
    return (
      <table border={border} cellSpacing="0">
        <colgroup>
          {
            store.rowWidth.map((width, index) => (
              <col width={width} style={{ width }} key={index} />
            ))
          }
        </colgroup>
        <thead>
          {
            columnHeader.map( rs => (
              <tr key={getAscId()}>
                {
                  rs.map(c => <Th column={c} key={getAscId()}/>)
                }
              </tr>
            ))
          }
        </thead>
      </table>
    );
  }
}