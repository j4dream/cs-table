import { getAscId } from "./util";

export default class Node {
  parent = null;
  children = [];
  data = null;
  id = null;
  level = null;
  colSpan = 0;
  rowSpan = 0;
  width = 0;
  height = 0;
  minHeight = 26;
  prop = null;
  name = '';

  constructor({children, name, prop, width, height = 30} = {}) {
    this.name = name;
    this.prop = prop;
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