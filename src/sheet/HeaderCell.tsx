import React, { useMemo } from 'react';

import { useDrag, useDrop } from '../hooks/useDragAndDrop';

interface Header {
  top: number;
  left: number;
  width: number;
  height: number;
  prop: string;
  label: string;
  parent: Header;
}

interface HeaderProps {
  header: Header;
  resizeProps: object;
}

export default ({
  header,
  resizeProps,
}: HeaderProps) => {

  const {
    top,
    left,
    width,
    height,
    prop,
    label
  }= header;

  const getDragProps = useDrag();
  const {dropProps, hoverProp} = useDrop({
    onDrop: () => {}
  });

  console.log( hoverProp === header.parent?.prop);

  return (
    <div
      className="header"
      style={{
        position: 'absolute',
        top: top,
        left: left,
        width: width,
        height: height,
        outline: hoverProp === header.parent?.prop ? '1px dashed blue' : 'none',
        outlineOffset: -2
      }}
      data-prop={prop}
      data-parent-prop={header.parent?.prop}
      {...getDragProps(prop)}
      {...dropProps}
      {...resizeProps}
    >
      {label}
    </div>
  );
}