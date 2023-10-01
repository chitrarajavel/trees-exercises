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

    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */

    minDepth() {
        if (this.root === null) return 0;

        function checkChildren(node) {
            if (node.left === null && node.right === null) {
                //No children
                return 1;
            } else if (node.left !== null && node.right !== null) {
                //Two children - Get the lower of the two
                return (
                    Math.min(
                        checkChildren(node.left),
                        checkChildren(node.right)
                    ) + 1
                );
            } else {
                //One child
                if (node.left === null) {
                    return checkChildren(node.right) + 1;
                } else if (node.right === null) {
                    return checkChildren(node.left) + 1;
                }
            }
        }
        return checkChildren(this.root);
    }

    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */

    maxDepth() {
        if (this.root === null) return 0;

        function checkChildren(node) {
            if (node.left === null && node.right === null) {
                //No children
                return 1;
            } else if (node.left !== null && node.right !== null) {
                //Two children - Get the higher of the two
                return (
                    Math.max(
                        checkChildren(node.left),
                        checkChildren(node.right)
                    ) + 1
                );
            } else {
                //One child
                if (node.left === null) {
                    return checkChildren(node.right) + 1;
                } else if (node.right === null) {
                    return checkChildren(node.left) + 1;
                }
            }
        }
        return checkChildren(this.root);
    }

    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */

    maxSum() {
        //Reference SB solution
        if (this.root === null) return 0;
        let maxSumVal = 0;
        function checkChildren(node) {
            if (node === null) return 0;
            let leftSum = checkChildren(node.left);
            let rightSum = checkChildren(node.right);

            //current node + left node + right node
            let branchSum = node.val + leftSum + rightSum;
            maxSumVal = Math.max(maxSumVal, branchSum);
            return Math.max(leftSum + node.val, rightSum + node.val);
        }
        checkChildren(this.root);
        return maxSumVal;
    }

    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */

    nextLarger(lowerBound) {
        let minVal = null;

        function findMin(node) {
            if (node === null) return;
            if (minVal === null && node.val > lowerBound) minVal = node.val;

            if (node.val < minVal && node.val > lowerBound) {
                minVal = node.val;
            }
            if (node.left !== null) findMin(node.left);
            if (node.right !== null) findMin(node.right);
        }
        findMin(this.root);
        return minVal;
    }
}

module.exports = {BinaryTree, BinaryTreeNode};
