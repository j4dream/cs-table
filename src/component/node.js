import { getAscId } from "./util";

export default class Node {
  parent = null;
  children = [];
  data = null;
  id = null;
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

  constructor({children, name, prop, field, width, height = 30} = {}) {
    this.name = name;
    this.prop = prop || field;
    this.width = width;
    this.height = height;
    this.id = getAscId();
  }

  addChild(data) {
    this.children.push(data);
  }

  computedHeight() {
    return this.height || this.minHeight;
  }
}