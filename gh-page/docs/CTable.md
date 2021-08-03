---
title: 简单表格
order: 2
---

## 何时使用
* 数据量大，某些场景不适合分页展示。
* 列数量太多，分页情况下页面内也渲染大量元素。

## 基本用法:

渲染 100,000 行
```tsx
import React from 'react';
import { CTable } from 'virtualized-sc-table';
import { header, data } from './cdata';

export default () => (
  <div className="dc-container">
    <CTable
      cellWidth={200}
      cellHeight={44}
      header={header}
      data={data}
      enableResize
      enableSorting
    />
  </div>
);
```

## API
api 跟统计表格类似，部分可参考统计表格。
| props | 默认值 | 描述 |
| --- | --- | --- |
| header: Array | [] | 必须 \*, 表头数据 [{ label: 'Name', prop: 'name', fixed: false }] fixed = ture 会固定到最左 |
| data: Array | [] | 必须 \*, 表格数据 [{ name: 'DDR' }] |
| preventScroll: Boolean | false | 防止滚动 |
| keepScrollStatus: Boolean | false | 当数据或标题更新时，保持滚动状态，否则滚动到 {0, 0} |
| enableResize: Boolean | false | 调整列宽 |
| enableSorting: Boolean | false | 拖拽排序 |
| renderCell: Function | (record, rowIndex, prop, header) => record | 自定渲染单元格方法，例如可以渲染编辑状态表格 |
| renderHeader: Function | (header, prop) => header.label | 自定渲染表头方法 |

