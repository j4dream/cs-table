import React from 'react';
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
  dragParentRef: React.MutableRefObject<string>;
}

export default ({
  header,
  resizeProps,
  dragParentRef,
}: HeaderProps) => {

  const {
    top,
    left,
    width,
    height,
    prop,
    label
  }= header;

  const getDragProps = useDrag({
    handleDrag: () => {
      dragParentRef.current = header.parent?.prop;
    }
  });

  const {dropProps, hoverProp} = useDrop({
    handleDrop: (dragProp, dropProp) => {
      // TODO: do switch position here
      console.log('ondrop: ', dragProp, dropProp);
    }
  });

  return (
    <div
      className="header"
      style={{
        position: 'absolute',
        top: top,
        left: left,
        width: width,
        height: height,
        outline: hoverProp === dragParentRef.current
                  ? '2px dashed green'
                  : 'none',
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