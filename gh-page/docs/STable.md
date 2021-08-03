---
title: 聚合统计表格
order: 1
---

## 何时使用
* 数据聚合；
* 多级表头，支持行列分组；
* 数据量大，某些场景不适合分页展示。

## 基本用法
rowHeader, colHeader, data 提供三个props
```tsx
import React from 'react';
import { STable } from 'virtualized-sc-table';
import clonedeep from 'lodash.clonedeep'
import sampleData from './sdata';

export default () => {
  const { rowHeader, colHeader, data } = sampleData;
  return (
    <div className="dc-container">
      <h3 className="text-center">XX 公司季度销售量统计表</h3>
      <STable
        rowHeader={rowHeader}
        colHeader={colHeader}
        data={data}
      />
    </div>
  );
};
```
## 自定义表格宽度高度

cellWidth，cellHeight 可以设置单元格宽度高度。
```jsx
import React from 'react';
import { STable } from 'virtualized-sc-table';
import clonedeep from 'lodash.clonedeep'
import sampleData from './sdata';

export default () => {
  const { rowHeader, colHeader, data } = sampleData;
  return (
    <div className="dc-container">
      <h3 className="text-center">XX 公司季度销售量统计表</h3>
      <STable
        rowHeader={rowHeader}
        colHeader={colHeader}
        data={data}
        cellWidth={120}
        cellHeight={35}
      />
    </div>
  );
}
```

## 拖动表头边缘调节宽度高度
拖动列伸缩的时候，会延迟渲染，对于视窗内 DOM 元素比较多的时候，拖动不会造成卡顿。  

```jsx
import React from 'react';
import { STable } from 'virtualized-sc-table';
import clonedeep from 'lodash.clonedeep'
import sampleData from './sdata';

export default () => {
  const { rowHeader, colHeader, data } = clonedeep(sampleData);
  return (
    <div className="dc-container">
      <h3 className="text-center">XX 公司季度销售量统计表</h3>
      <STable
        enableColResize
        enableRowResize
        rowHeader={rowHeader}
        colHeader={colHeader}
        data={data}
      />
    </div>
  );
}
```

## 拖拽表头排序
enableColSorting，enableRowSorting 支持拖拽排序表头，部分重要数据需要排序到前面，可直接拖动表头排序，同时支持行列排序。  
注意：你只能排序相同子节点。
```jsx
import React from 'react';
import { STable } from 'virtualized-sc-table';
import clonedeep from 'lodash.clonedeep'
import sampleData from './sdata';

export default () => {
  const { rowHeader, colHeader, data } = clonedeep(sampleData);
  return (
    <div className="dc-container">
      <h3 className="text-center">XX 公司季度销售量统计表</h3>
      <STable
        enableColSorting
        enableRowSorting
        rowHeader={rowHeader}
        colHeader={colHeader}
        data={data}
      />
    </div>
  );
}
```

## 自定义渲染表格
通过指定 renderCell 方法可以渲染表格，你可以渲染成一个可编辑状态的表格，或者自定义组件。

```jsx
import React from 'react';
import { STable } from 'virtualized-sc-table';
import sampleData from './sdata';

export default () => {
  const { rowHeader, colHeader, data } = sampleData;
  return (
    <div className="dc-container">
      <h3 className="text-center">XX 公司季度销售量统计表</h3>
      <STable
        renderCell={(record, rowProp, colProp, data) => {
          if (!record) return '---';
          if (rowProp.indexOf('gd-') !== -1) return <span>{record} ❤️</span>;
          return record;
        }}
        rowHeader={rowHeader}
        colHeader={colHeader}
        data={data}
      />
    </div>
  );
}
```

## 自适应父元素宽高  
建议预设 width，height 如果不确定，请使用 AutoSizeSTable，组件会自动获取父节点宽高。

```jsx
import React from 'react';
import { AutoSizeSTable } from 'virtualized-sc-table';
import sampleData from './sdata';

export default () => {
  const { rowHeader, colHeader, data } = sampleData;
  return (
    <div className="dc-container">
      <h3 className="text-center">XX 公司季度销售量统计表</h3>
      <div style={{width: 700, height: 300}}>
        <AutoSizeSTable
          rowHeader={rowHeader}
          colHeader={colHeader}
          data={data}
          cellHeight={22}
          cellWidth={80}
        />
      </div>
    </div>
  );
}
```
## API
| props | 默认值 | 描述 |
| --- | --- | --- |
| colHeader: Array | [] | 必须 \*, 表格列头 [{ label: 'Name', prop: 'name' }] |
| rowHeader: Array | [] | 必须 \*, 表格行头 [{ label: 'Name', prop: 'name' }] |
| data: Object | {} | 必须 \*, 单元格数据 { "rowProp" { "colProp": 'DDR' } } |
| renderCell: Function | (record, rowProp, colProp, data) => record | 自定义渲染单元格，例如可以渲染编辑状态表格 |
| cellWidth: number | 100 | 单元格宽度 |
| cellHeight: number | 40 | 单元格高度 |
| enableColResize: boolean | false | 调整列宽 |
| enableRowResize: boolean | false | 调整列高|
| enableColSorting: boolean | false | 列表头排序 |
| enableRowSorting: boolean | false | 行表头排序 |