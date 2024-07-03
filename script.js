class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

const buildTree = (array, start = 0, end = arr.length - 1) => {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);


    return root;
}

class Tree {
    constructor(arr) {
        this.array = arr
        this.root = buildTree(arr)
    }

    #minValue(root) {
        let minv = root.data;
        while (root.left !== null) {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }
    #maxValue(root) {
        let maxv = root.data;
        while (root.right !== null) {
            maxv = root.right.data;
            root = root.right;
        }
        return maxv;
    }

    insert(value, root = this.root) {
        if (root === null) {
            root = new Node(value);
            return root;
        }
        
        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    delete(value, root = this.root) {
        if (root === null) return root;

        if (value < root.data) {
            root.left = this.delete(value, root.left);
        } else if (value > root.data) {
            root.right = this.delete(value, root.right);
        }
    

        else {
            if (root.left === null) return root.right;
            else if (root.right === null) return root.left;

            root.data = this.#minValue(root.right)
            root.right = this.delete(value, root.right)
        }
        return root
    }

    find(value, root = this.root) {
        if (root === null || root.data === value) return root;
    
        if (value < root.data) {
            return this.find(value, root.left);
        }
        return this.find(value, root.right); 
       
    }

    levelOrder(callback) {
        const result = [];
        const queue = [this.root];

        while (queue.length) {
            let level = [];
            let size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift()
                level.push(node.data)
                if (node.left) queue.push(node.left)
                if (node.right) queue.push(node.right)
                if (callback) callback(node)
            }
        result.push(level)
        }
        return result;
    }

    inOrder(node = this.root, callback, result = []) {
        if (!this.root) return []
        if (node === null) return;
        this.inOrder(node.left, callback, result);
        callback ? callback(node) : result.push(node.data);
        this.inOrder(node.right, callback, result);
        if (result) return result;
    }

    preOrder(callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const results = [];
        while (stack.length) {
            const node = stack.pop();
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
            if (callback) callback(node);
            results.push(node.data)
        }
        if (!callback) return results
    }

    postOrder(callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const results = [];
        while (stack.length) {
            const node = stack.pop();
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
            if (callback) callback(node);
            results.push(node.data)
        }
        if (!callback) return results.reverse();
    }

    height(root = this.root) {
        if (root === null) return 0;

        let lHeight = this.height(root.left);
        let rHeight = this.height(root.right);
        
        if (lHeight > rHeight) {
            return lHeight + 1;
        } else {
            return rHeight + 1;
        }
    }

    depth(node, root = this.root, depth = 0) {
        if (root === null || node === null) return;
        if (node === root) return `Depth: ${depth}`
        if (node.data < root.data) {
            return this.depth(node, root.left, depth += 1)
        } else {
            return this.depth(node, root.right, depth += 1)
        }
    }

    isBalanced(root = this.root) {
        const lHeight = this.height(root.left);
        const rHeight = this.height(root.right);
        const diff = Math.abs(lHeight - rHeight)
        return diff < 2 ? true : false;
    }

    rebalance(root = this.root) {
        let arr = this.levelOrder([], [], root);
        arr.sort((a,b) => a - b);
        return this.root = buildTree(arr);
    }

}

/* utility function */
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let myTree = new Tree(arr)

prettyPrint(myTree.root)

console.log(myTree.inOrder())


