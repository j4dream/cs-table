import React from 'react';
import { convertToRowHeader, getAscId }  from './util';

export default class TableRowHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnHeader: convertToRowHeader(props.rowHeader)
    };
  }

  render() {
    const { columnHeader } = this.state;
    const { border, width } = this.props;
    return (
      <table border={border} cellSpacing="0">
        <thead>
          {
            columnHeader.map( rs => (
              <tr key={getAscId()}>
                {
                  rs.map(h => <th colSpan={h.colSpan} rowSpan={h.rowSpan} key={getAscId()}>{h.name}</th>)
                }
              </tr>
            ))
          }
        </thead>
      </table>
    );
  }
}