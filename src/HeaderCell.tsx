import React, { useMemo } from 'react';
import { useDrag, useDrop } from './hooks/useDragAndDrop';

import { defalHeaderRenderer } from './types';

interface Header {
  left: number;
  width: number;
  height: number;
  prop: string;
  label: string;
  levelInfo?: string;
  renderHeader?: defalHeaderRenderer;
  parent?: Header;
  top?: number;
}

interface HeaderProps {
  header: Header;
  resizeProps: object;
  dragParentRef: React.MutableRefObject<string>;
  handleSort: Function;
  enableSorting: boolean;
  renderHeader?: defalHeaderRenderer;
}

export default ({ header, resizeProps, dragParentRef, handleSort, enableSorting }: HeaderProps) => {
  const { top = 0, left, width, height, prop, label, renderHeader, levelInfo } = header;

  const getDragProps = useDrag({
    handleDrag: () => {
      dragParentRef.current = levelInfo || "-";
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
    [enableSorting, prop, getDragProps, dropProps],
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
      data-level-info={levelInfo || '-'}
      {...sortingProps}
      {...resizeProps}
    >
      {renderHeader ? renderHeader(header, prop) : label}
    </div>
  );
};
