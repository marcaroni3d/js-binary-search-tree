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
        while (root.left != null) {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
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

console.log(myTree.find(23))


