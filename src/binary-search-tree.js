const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }

    let currentNode = this._root;

    while (currentNode) {
      if (node.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = node;
          return;
        }

        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = node;
          return;
        }

        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    if (!this._root || !data) {
      return false;
    }

    let currentNode = this._root;

    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      }

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  find(data) {
    if (!this._root || !data) {
      return null;
    }

    let currentNode = this._root;
    let found = null;

    while (!found && currentNode) {
      if (data === currentNode.data) {
        found = currentNode;
      }

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return found;
  }

  remove(data) {
    this._root = removeItem(this._root, data);

    function removeItem(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeItem(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeItem(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;

        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;

        node.right = removeItem(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this._root) {
      return null;
    }

    let node = this._root;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let node = this._root;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};