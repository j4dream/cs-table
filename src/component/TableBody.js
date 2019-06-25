import React from 'react';
import { getAscId }  from './util';

export default class TableBody extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
        <tbody>
          {
            store.data.map(row => {
              return (
                <tr key={getAscId()}>
                  {
                    store.columns.map(column => {
                      return (<td key={getAscId()}>{row[column.prop]}</td>);
                    })
                  }
                </tr>
              );
            })
          }
          
        </tbody>
      </table>
    );
  }
}