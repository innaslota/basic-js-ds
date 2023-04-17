const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        }

        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        }

        currentNode = currentNode.right;
      } else {
        // if data is already present in the tree, do nothing
        return;
      }
    }
  }

  has(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }

    return false;
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }

    return null;
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data === node.data) {
      // node is a leaf node
      if (node.left === null && node.right === null) {
        return null;
      }

      // node has only one child
      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      // node has two children
      let tempNode = node.right;

      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }

      node.data = tempNode.data;
      node.right = this._removeNode(node.right, tempNode.data);

      return node;
    } else if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else {
      node.right = this._removeNode(node.right, data);
      return node;
    }
  }

  min() {
    let currentNode = this.rootNode;

    while (currentNode && currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return currentNode !== null ? currentNode.data : null;
  }

  max() {
    let currentNode = this.rootNode;

    while (currentNode && currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return currentNode !== null ? currentNode.data : null;
  }
}

module.exports = {
  BinarySearchTree
};