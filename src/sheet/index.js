import React from 'react';

import useTree from './useTree';

export default function(props) {
  console.log(props);

  const { rowHeader, colHeader, data } = useTree(props);

  console.log('ddr :', rowHeader, colHeader, data);

  return (
    <div className="cs-sheet"> </div>
  )
}