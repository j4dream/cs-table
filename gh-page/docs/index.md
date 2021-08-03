---
title: 前言
order: 0
route: /
---
## 用 React Hooks 写的虚拟化表格

![image](https://github.com/j4dream/dc-table/blob/master/gh-page/assets/stable.gif)

前端一个常见的性能问题，在JS中操作渲染大量 DOM（长列表问题），会导致浏览器严重卡顿，甚至出现假死状态。  
通常解决这种情况有以下三种办法：
* 1. 分页。
* 2. 滚动加载，逐步加载 DOM (但有个缺点，如果加载多了改动布局的时候仍然会卡顿)。
* 3. 虚拟化，仅渲染视区显示数据。

这里主要实现的是第三点，也就是前端遇到一些无法使用分页处理的场景。  

简单对比一下，可以体验一下两者区别 <a href="https://1bq27.csb.app/" target="_blank">原始表格</a>--VS--<a href="https://2l6l9.csb.app/" target="_blank">虚拟化表格</a>  

使用原始表格显示大量数据，消耗内存过多，如果页面存在多个表格，对性能影响非常严重。

![image](https://github.com/j4dream/dc-table/blob/master/gh-page/assets/memory-compare.png)
## 现有组件现状
因为开源的组件大部分都缺少我想要的功能。  
其实主要是支持虚拟化，同时支持用户动态调整行列大小，交换行列顺序，同时保留用户这些改动。

在此之前都尝试过以下组件:

Ant design table(rc-table)，在 3.X 时未支持，拖动排序(表头)，拖动缩放表格宽度，未支持虚拟化，
这导致数据量比较多的时候, 页面渲染慢。  
虽然 Ant design table 在 4.X 之后，可以使用 react-window 渲染列表，但并不支持嵌套行表头，嵌套拖动排序。

Element react table，数据量大的时候也存在性能问题，而且未提供虚拟化渲染。
在数据更新的时候导致页面 reflow，卡顿几秒，同时功能上也未满足需求。

另一个 React Virtualized，也玩了一会，在测试大量数据后组件依然流畅，但功能并不满足，具体表现:
不支持行嵌套表头，不可伸缩，不支持行列排序。

## 安装使用

npm 安装，未依赖其他库 
```bash
npm i virtualized-sc-table --save
# 或者
yarn add virtualized-sc-table
```



使用 (详情使用请参考后面篇章)，或者直接访问 Codesandbox 链接 <a href="https://codesandbox.io/s/stable-cfehb" target="_blank"> 统计表格</a>， <a href="https://codesandbox.io/s/ctable-2l6l9" target="_blank">简单表格</a> 查看演示。
```javascript
import { CTable, STable } from 'virtualized-sc-table';

// 聚合统计表格
<STable
  colHeader={[]}
  rowHeader={[]}
  data={header}
/>

// 一般表格
<CTable
  header={header}
  data={data}
  renderCell={(record, prop) => record[prop]}
  renderHeader={(header, prop) => header[prop]}
/>

```
