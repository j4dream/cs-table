import React from 'react';
import Sheet, { STableProps } from './';
import { useSize } from '../hooks/useSize';

export default function (props: STableProps): JSX.Element {
  const [state, ref] = useSize();
  const { width, height } = state;

  return (
    <div
      ref={ref}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {!!width && !!height && <Sheet {...props} width={width} height={height} />}
    </div>
  );
}
