/** BinaryTreeNode: node for a general tree. */
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /**
   * minDepth(): return the minimum depth of the tree.
   * Depth is the number of edges from the root to the leaf.
   */
  minDepth() {
    if (!this.root) return 0; // Empty tree has depth of 0.

    let queue = [{ node: this.root, depth: 1 }]; // Using BFS to traverse the tree.

    while (queue.length) {
      let { node, depth } = queue.shift();

      // If we find a leaf node, we return its depth.
      if (!node.left && !node.right) {
        return depth;
      }

      if (node.left) {
        queue.push({ node: node.left, depth: depth + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, depth: depth + 1 });
      }
    }
  }

  /**
   * maxDepth(): return the maximum depth of the tree.
   * We recursively find the depth for the left and right subtrees and return the max of the two.
   */
  maxDepth(root = this.root) {
    if (!root) return 0; // Base case: an empty tree/subtree has depth 0.

    let leftDepth = this.maxDepth(root.left);
    let rightDepth = this.maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }

  /**
   * maxSum(): return the maximum sum by traveling along a path in the tree.
   * We calculate the max path sum for each node and track the maximum.
   */
  maxSum() {
    let result = Number.MIN_SAFE_INTEGER;

    function helper(node) {
      if (!node) return 0; // Base case: if node is null, the max sum is 0.

      let left = Math.max(0, helper(node.left)); // Only consider positive sums.
      let right = Math.max(0, helper(node.right));

      result = Math.max(result, left + right + node.val); // Update our result.

      return Math.max(left, right) + node.val; // Return the max sum including the current node.
    }

    helper(this.root);
    return result;
  }

  /**
   * nextLarger(lowerBound): return the smallest value in the tree which is larger than lowerBound.
   * We use an in-order traversal since it processes nodes in their inherent sequence.
   */
  nextLarger(lowerBound) {
    let stack = [];
    let node = this.root;

    while (stack.length || node) {
      // Traverse left while possible.
      while (node) {
        stack.push(node);
        node = node.left;
      }
      // Process current node.
      node = stack.pop();

      if (node.val > lowerBound) {
        return node.val;
      }

      // Move to the right.
      node = node.right;
    }

    return null; // No larger value found.
  }

  /**
   * areCousins(node1, node2): determine if two nodes are cousins.
   * Cousins are nodes that are at the same depth but have different parents.
   */
  areCousins(node1, node2) {
    let info1, info2; // Stores parent and depth for nodes.

    function dfs(node, parent, depth) {
      if (!node) return;

      if (node === node1) {
        info1 = { parent, depth };
      } else if (node === node2) {
        info2 = { parent, depth };
      }

      // Recursive DFS.
      dfs(node.left, node, depth + 1);
      dfs(node.right, node, depth + 1);
    }

    dfs(this.root, null, 0);

    // Check if nodes are at same depth and have different parents.
    return (
      info1 &&
      info2 &&
      info1.depth === info2.depth &&
      info1.parent !== info2.parent
    );
  }

  /**
   * serialize(tree): Convert the BinaryTree object tree into a string.
   */
  static serialize(tree) {
    function helper(node) {
      if (!node) return "X,"; // Use 'X' to denote null nodes.
      return node.val + "," + helper(node.left) + helper(node.right);
    }

    return helper(tree.root);
  }

  /**
   * deserialize(stringTree): Convert string back into a BinaryTree object.
   */
  static deserialize(data) {
    let nodes = data.split(",");

    function helper() {
      let val = nodes.shift();
      if (val === "X") return null;
      let node = new BinaryTreeNode(parseInt(val, 10));
      node.left = helper();
      node.right = helper();
      return node;
    }

    return new BinaryTree(helper());
  }

  /**
   * lowestCommonAncestor(node1, node2): Find the LCA of two nodes.
   */
  lowestCommonAncestor(node1, node2) {
    function helper(node) {
      if (!node) return null;

      // If we find either of the nodes, we return the current node.
      if (node === node1 || node === node2) return node;

      let leftSearch = helper(node.left);
      let rightSearch = helper(node.right);

      // If both nodes are found in left and right subtrees, current node is the LCA.
      if (leftSearch && rightSearch) return node;

      // Otherwise, return whichever non-null value.
      if (leftSearch) return leftSearch;
      if (rightSearch) return rightSearch;

      return null;
    }

    return helper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
