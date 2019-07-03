import React from 'react';
import { getAscId }  from './util';

export default class TableBody extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { border, colHeaderWidth, store } = this.props;
    return (
      <table border="0" cellSpacing="0" style={{width: colHeaderWidth}}>
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
                      return (<td key={getAscId()}><div className="cell">{row[column.prop]}</div></td>);
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