import React, { useMemo } from 'react';
import { useDrag, useDrop } from './hooks/useDragAndDrop';

interface Header {
  top: number;
  left: number;
  width: number;
  height: number;
  prop: string;
  label: string;
  renderHeader?: Function;
  parent: Header;
}

interface HeaderProps {
  header: Header;
  resizeProps: object;
  dragParentRef: React.MutableRefObject<string>;
  handleSort: Function;
  enableSorting: boolean;
}

export default ({ header, resizeProps, dragParentRef, handleSort, enableSorting }: HeaderProps) => {
  const { top, left, width, height, prop, label, renderHeader } = header;

  const getDragProps = useDrag({
    handleDrag: () => {
      dragParentRef.current = header.parent?.prop;
    },
  });

  const { dropProps, hoverProp, setHoverProp } = useDrop({
    handleDrop: (dragProp, dropProp) => {
      if (dragProp !== dropProp) {
        handleSort && handleSort(dragProp, dropProp);
      }
      dragParentRef.current = 'UNDEFINED_SHEET';
      setHoverProp('');
    },
  });

  // dyn add props
  const sortingProps = useMemo(
    () =>
      enableSorting
        ? {
            ...getDragProps(prop),
            ...dropProps,
          }
        : {},
    [prop],
  );

  return (
    <div
      className="header"
      style={{
        position: 'absolute',
        top: top,
        left: left,
        width: width,
        height: height,
        outline: hoverProp === dragParentRef.current ? '2px dashed green' : 'none',
        outlineOffset: -2,
      }}
      data-prop={prop}
      data-parent-prop={header.parent?.prop}
      {...sortingProps}
      {...resizeProps}
    >
      {renderHeader ? renderHeader(header, prop) : label}
    </div>
  );
};
