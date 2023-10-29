class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  // ==========================
  // 1. Sum up all the values in the tree.
  // ==========================
  sumValues() {
    return this._sumValuesHelper(this.root);
  }

  _sumValuesHelper(node) {
    if (!node) return 0; // Base case: if the node is null, return 0.

    // Initialize sum with the current node's value.
    let sum = node.val;

    // Add the sum of children's values to the current sum.
    for (const child of node.children) {
      sum += this._sumValuesHelper(child);
    }

    return sum;
  }

  // ===================================
  // 2. Count all nodes with even values.
  // ===================================
  countEvens() {
    return this._countEvensHelper(this.root);
  }

  _countEvensHelper(node) {
    if (!node) return 0; // Base case: if the node is null, return 0.

    // If the current node's value is even, set count to 1, else 0.
    let count = node.val % 2 === 0 ? 1 : 0;

    // Add the count of even-valued children to the current count.
    for (const child of node.children) {
      count += this._countEvensHelper(child);
    }

    return count;
  }

  // ==========================================================
  // 3. Count the number of nodes whose value is greater than a given lowerBound.
  // ==========================================================
  numGreater(lowerBound) {
    return this._numGreaterHelper(this.root, lowerBound);
  }

  _numGreaterHelper(node, lowerBound) {
    if (!node) return 0; // Base case: if the node is null, return 0.

    // If the current node's value is greater than lowerBound, set count to 1, else 0.
    let count = node.val > lowerBound ? 1 : 0;

    // Add the count of children with values greater than lowerBound to the current count.
    for (const child of node.children) {
      count += this._numGreaterHelper(child, lowerBound);
    }

    return count;
  }
}

module.exports = { Tree, TreeNode };
