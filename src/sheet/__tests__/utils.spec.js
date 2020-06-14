import { getNodeByProp, switchPosByProps, processTree } from '../util';

import sampleData from '../demo/data'

test('test getNodeByProp', () => {
  expect(getNodeByProp(sampleData.rowHeader, 'gd').label).toBe('广东');
  expect(getNodeByProp(sampleData.rowHeader, 'gd-gz').label).toBe('广州');
  expect(getNodeByProp(sampleData.rowHeader, 'sd').label).toBe('山东');
  expect(getNodeByProp(sampleData.rowHeader, 'sd-qd').label).toBe('青岛');
});

test('test switchPosByProps', () => {
  processTree(sampleData.rowHeader, ['rowSpan', 'colSpan'], {});

  switchPosByProps(sampleData.rowHeader, 'gd', 'sd');
  expect(sampleData.rowHeader[0].label).toBe('山东');
  expect(sampleData.rowHeader[2].label).toBe('广东');

  switchPosByProps(sampleData.rowHeader, 'gd-gz', 'gd-fs');
  expect(sampleData.rowHeader[2].children[0].label).toBe('佛山');
  expect(sampleData.rowHeader[2].children[1].label).toBe('广州');
});