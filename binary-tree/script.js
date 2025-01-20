"use strict";
class TreeNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    toString() {
        return this.key.toString();
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    _insert(node, key) {
        if (node == null) {
            return new TreeNode(key);
        }
        if (key < node.key) {
            node.left = this._insert(node.left, key);
        }
        else if (key > node.key) {
            node.right = this._insert(node.right, key);
        }
        return node;
    }
    insert(key) {
        this.root = this._insert(this.root, key);
    }
    _search(node, key) {
        if (node == null || node.key == key) {
            return node;
        }
        if (key < node.key) {
            return this._search(node.left, key);
        }
        return this._search(node.right, key);
    }
    search(key) {
        return this._search(this.root, key);
    }
    _delete(node, key) {
        if (node == null) {
            return node;
        }
        if (key < node.key) {
            node.left = this._delete(node.left, key);
        }
        else if (key > node.key) {
            node.right = this._delete(node.right, key);
        }
        else {
            if (node.left == null) {
                return node.right;
            }
            else if (node.right == null) {
                return node.left;
            }
            node.key = this._minValue(node.right);
            node.right = this._delete(node.right, node.key);
        }
        return node;
    }
    delete(key) {
        this.root = this._delete(this.root, key);
    }
    _minValue(node) {
        while (node.left != null) {
            node = node.left;
        }
        return node.key;
    }
    _inOrderTraversal(node, result) {
        if (node) {
            this._inOrderTraversal(node.left, result);
            result.push(node.key);
            this._inOrderTraversal(node.right, result);
        }
    }
    inOrderTraversal() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }
}
const bst = new BinarySearchTree();
const nodes = [50, 30, 20, 40, 70, 60, 80];
for (let node of nodes) {
    bst.insert(node);
}
console.log('Search for 80:', bst.search(80));
console.log('Inorder traversal:', bst.inOrderTraversal());
bst.delete(40);
console.log('Search for 40:', bst.search(40));
console.log('Inorder traversal after deleting 40:', bst.inOrderTraversal());
