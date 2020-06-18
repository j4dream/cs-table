import Node from './node';
import cloneDeep from 'lodash.clonedeep';
// import differenceby from 'lodash.differenceby';
import remove from 'lodash.remove';

export default class Tree {
  children = [];
  deepestNodePath = [];
  leafNodes = [];
  setting = {};
  sorting = [];
  root = new Node();

  sortingColumn = null;

  constructor(data = [], setting = {}, sorting = []) {
    this.setting = setting;
    this.sorting = sorting;
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
      node.children.forEach((item) => {
        this._traverse(item, currentNode);
      });
    }
  }

  _initTree(data) {
    // saved col setting
    const start = new Date().getTime();
    if (this.sorting) {
      const mockCloneData = { children: cloneDeep(data), prop: 'root' };
      const mockData = { children: data, prop: 'root' };
      const mockSorted = { children: this.sorting, prop: 'root' };
      this.traverseDF((node) => {
        const prop = node.prop;
        const dataNode = this.getNodeByProp(prop, mockData);
        const sortedNode = this.getNodeByProp(prop, mockSorted);
        if (sortedNode) {
          this.soredNodesWidthSeq(dataNode.children, sortedNode.children);
        }
      }, mockCloneData);
    }
    const end = new Date().getTime();
    console.log('used time: ', end - start);
    data.forEach((item) => {
      this._traverse(item, this.root);
    });
  }

  // source 原地算法排序
  soredNodesWidthSeq(source, dest) {
    dest.forEach((item) => {
      const tempEl = remove(source, function (i) {
        return i.prop === item.prop;
      });
      if (tempEl.length) {
        source.push(tempEl[0]);
      }
    });
  }

  _findDeepestNodePath() {
    const allNodes = this.getBFSNodes();
    // deepest node
    let dn = allNodes[allNodes.length - 1];
    const deepestPath = [];
    while (dn && dn.parent) {
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

  getNodeByProp(prop, root) {
    let node = null;
    this.traverseDF((n) => {
      if (n.prop === prop) {
        node = n;
        return true;
      }
    }, root);
    return node;
  }

  getDFSNodes() {
    const rootNode = cloneDeep(this.root);
    this.traverseDF((node) => {
      node.clear();
    }, rootNode);
    return rootNode.children;
  }

  traverseDF(cb, parent) {
    let pNode = parent || this.root;
    if (!pNode) return;
    const recurse = (node) => {
      if (cb(node)) return;
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          recurse(node.children[i]);
        }
      }
    };
    recurse(pNode);
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
    while (tn && tn.children.length) {
      const l = tn.children.length;
      tn = tn.children[l - 1];
      cb && cb(tn);
    }
    return tn;
  }

  getDeepestNodeByIndex(index = this.deepestNodePath.length - 1) {
    return this.deepestNodePath[index];
  }

  sortSameLevelPos(rep) {
    if (this.sortingColumn && this.sortingColumn.level !== rep.level) {
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

  // 递归对比每个子节点数据是否一致
  // isSavedTreeVaild(data, sorting) {
  //   if (!data.length || !sorting.length) return false;
  //   if (data.length !== sorting.length) return false;
  //   const mockData = { children: data, prop: 'root' };
  //   const mockSorting = { children: sorting, prop: 'root' };

  //   let validTree = true;
  //   this.traverseDF((node) => {
  //     const prop = node.prop;
  //     const sortedNode = this.getNodeByProp(prop, mockSorting);
  //     // 保存树找不到对象返回 true 结速递归，并标记此保存数据无效。
  //     if (!sortedNode) {
  //       validTree = false;
  //       return true;
  //     }
  //     const diff = differenceby(node.children, sortedNode.children, "prop");

  //     // 保存树对比数据不一致返回 true 结速递归，并标记此保存数据无效。
  //     if (diff.length) {
  //       validTree = false;
  //       return true;
  //     }
  //   }, mockData);

  //   return validTree;
  // }
}
