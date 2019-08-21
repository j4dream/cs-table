import Node from './node';

export default class Tree {
  children = [];
  deepestNodePath = [];
  leafNodes = [];
  setting = {};
  root = new Node();

  sortingColumn = null;

  constructor(data = [], setting = {}) {
    this.setting = setting;
    this.buildTree(data);
  }

  buildTree(data) {
    this._initTree(data);
    this.deepestNodePath = this._findDeepestNodePath();
    this.leafNodes = this.getLeafNodes();
  }

  _traverse(node, parent) {
    const { prop, field } = node;
    const savedConfig = this.setting[prop] || this.setting[field];
    if (savedConfig) {
      Object.assign(node, savedConfig);
    }
    const currentNode = new Node(node);
    if (parent) {
      currentNode.parent = parent;
      parent.addChild(currentNode);
    }
    
    if (node.children) {
      node.children.forEach(item => {
        this._traverse(item, currentNode);
      })
    }
  }

  _initTree(data) {
    data.forEach(item => {
      this._traverse(item, this.root);
    });
  }
  
  _findDeepestNodePath() {
    const allNodes = this.getBFSNodes();
    // deepest node
    let dn = allNodes[allNodes.length-1];
    const deepestPath = [];
    while(dn && dn.parent) {
      deepestPath.unshift(dn);
      dn = dn.parent;
    }

    return deepestPath;
  }

  // BFS
  getBFSNodes() {
    const allNodes = [];
    const queue = this.root.children.slice();

    for (let i = 0; queue[i]; i++) {
      allNodes.push(queue[i]);
      if (queue[i].children) queue.push(...queue[i].children);
    }

    return allNodes;
  }

  getLeafNodes(nodes = this.root.children) {
    const result = [];
    nodes.forEach((node) => {
      if (node.children && node.children.length) {
        result.push(...this.getLeafNodes(node.children));
      } else {
        result.push(node);
      }
    });
    return result;
  }

  getLastNode(node = this.root, cb) {
    let tn = node;
    while(tn && tn.children.length) {
      const l = tn.children.length;
      tn = tn.children[l-1];
      cb && cb(tn);
    }
    return tn;
  }

  getDeepestNodeByIndex(index = this.deepestNodePath.length - 1) {
    return this.deepestNodePath[index];
  }

  sortSameLevelPos(rep) {
    if (this.sortingColumn && (this.sortingColumn.level !== rep.level)) {
      return false;
    }

    const parent = this.sortingColumn.parent;
    const repParent = rep.parent;
    if (parent !== repParent) {
      return false;
    }

    const sortingIndex = parent.children.indexOf(this.sortingColumn);
    const rIndex = parent.children.indexOf(rep);
    parent.children.splice(sortingIndex, 1);
    parent.children.splice(rIndex, 0, this.sortingColumn);

    this.leafNodes = this.getLeafNodes();

    return true;
  }
}