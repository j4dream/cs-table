import React, { useCallback, useMemo, useRef, useState } from 'react';

type DropOpts = {
  handleDrop: (dragProp: string, dropProp: string) => void;
};

type DropProps = {
  onDrop: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDragOver: React.DragEventHandler;
};

type DropRes = {
  dropProps: DropProps;
  hoverProp: string;
  setHoverProp: (prop: string) => void;
};

export const useDrop = (opts: DropOpts): DropRes => {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const [hoverProp, setHoverProp] = useState('');

  const dropProps = useMemo(
    () => ({
      onDrop: (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.persist();
        if (optsRef.current.handleDrop) {
          optsRef.current.handleDrop(
            e.dataTransfer.getData('dragProp'),
            e.currentTarget.dataset.prop || '',
          );
        }
      },
      onDragEnter: (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setHoverProp(e.currentTarget.dataset.parentProp as string);
      },
      onDragLeave: (e: any) => {
        setHoverProp('');
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
      },
    }),
    [optsRef, setHoverProp],
  );

  return { dropProps, hoverProp, setHoverProp };
};

type DragOpts = {
  handleDrag: (dragProp: string) => void;
};

type DragProps = {
  key: string;
  draggable: string;
  onDragStart: (e: React.DragEvent) => void;
};

type DragRes = (prop: string) => DragProps;

export const useDrag = (opts: DragOpts): DragRes => {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const getDragProps = useCallback(
    (prop) => {
      return {
        key: JSON.stringify(prop),
        draggable: 'true' as const,
        onDragStart: (e: React.DragEvent) => {
          optsRef.current.handleDrag && optsRef.current.handleDrag(prop);
          e.dataTransfer.setData('dragProp', prop);
        },
      };
    },
    [optsRef],
  );

  return getDragProps;
};
