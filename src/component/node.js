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

  constructor({children, name, prop, width} = {}) {
    this.name = name;
    this.prop = prop;
    this.width = width;
    this.id = getAscId();
  }

  addChild(data) {
    this.children.push(data);
  }
}