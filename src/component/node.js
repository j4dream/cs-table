import { getAscId } from "./util";

export default class Node {
  parent = null;
  children = [];
  data = null;
  key = null;
  level = null;
  colSpan = 0;
  rowSpan = 0;
  width = null;
  height = 0;
  minHeight = 30;
  minWidth = 80;
  realWidth = 80;
  prop = null;
  field = null;
  name = '';

  constructor({children, name, prop, field, width, height = 40} = {}) {
    this.name = name;
    this.prop = prop || field;
    this.width = width;
    this.realWidth = width;
    this.height = height;
    this.key = getAscId();
  }

  addChild(data) {
    this.children.push(data);
  }

  computedHeight() {
    return this.height || this.minHeight;
  }

  // for stringify
  clear() {
    // keep prop, children
    this.parent = undefined;
    this.data = undefined;
    this.key = undefined;
    this.colSpan = undefined;
    this.rowSpan = undefined;
    this.width = undefined;
    this.height = undefined;
    this.minHeight = undefined;
    this.minWidth = undefined;
    this.realWidth = undefined;
    this.field = undefined;
    this.name = undefined;
    this.start = undefined;
  }
}