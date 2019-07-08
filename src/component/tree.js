import Node from './node';

export default class Tree {
  children = [];
  deepestNodePath = [];
  leafNodes = [];
  setting = {};
  root = new Node();
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
    const { prop } = node;
    const savedConfig = this.setting[prop];
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
  // BFS
  _findDeepestNodePath() {
    const allNodes = [];
    const queue = this.root.children.slice();
    for (let i = 0; queue[i]; i++) {
      allNodes.push(queue[i]);
      if (queue[i].children) queue.push(...queue[i].children);
    }
    // deepest node
    let dn = allNodes[allNodes.length-1];

    const deepestPath = [];
    while(dn && dn.parent) {
      deepestPath.unshift(dn);
      dn = dn.parent;
    }

    return deepestPath;
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
}