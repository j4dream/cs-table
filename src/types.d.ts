import { MutableRefObject } from 'react';

export type RefDOM = MutableRefObject<HTMLElement>;

export type Header = {
  label: string,
  prop: string,
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export type DataCell = {
  [key]: string;
}
