class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Tree{
    constructor(array){
        this.array = array;
        this.root = null;
    }
    buildTree(){
        const sortedArray = this.array.sort((a, b) => a - b);
        const uniqueArray = [...new Set(sortedArray)];
        this.root = bst(uniqueArray, 0, uniqueArray.length - 1);
        prettyPrint(this.root);
    }
    insert(value){
        if(this.root === null) this.root = new Node(value);
        let currentNode = this.root;
        while(currentNode.left !== null || currentNode.right !== null){
            if(value > currentNode.data) currentNode = currentNode.right;
            else currentNode = currentNode.left; 
        }
        if(value > currentNode.data) currentNode.right = new Node(value);
        else currentNode.left = new Node(value);
    }
    delete(value){
        let currentNode = this.root;
        let previousNode = null;
    
        while (currentNode) {
          if (value > currentNode.data) {
            if (currentNode.right === null) {
              return;
            }
            previousNode = currentNode;
            currentNode = currentNode.right;
          }
          if (value < currentNode.data) {
            if (currentNode.left === null) {
              return;
            }
            previousNode = currentNode;
            currentNode = currentNode.left;
          }
          if (value === currentNode.data) {
            if (!currentNode.left && !currentNode.right) {
              if (value > previousNode.data) {
                return (previousNode.right = null);
              }
              return (previousNode.left = null);
            }
    
            if (!currentNode.left) {
              if (value > previousNode.data) {
                return (previousNode.right = currentNode.right);
              }
              return (previousNode.left = currentNode.right);
            }
    
            if (!currentNode.right) {
              if (value > previousNode.data) {
                return (previousNode.right = currentNode.left);
              }
              return (previousNode.left = currentNode.left);
            }
    
            if (currentNode.left && currentNode.right) {
              // Child with higher value (right) will replace removed node
              const replacementNode = currentNode.right;
              // Left node will always connected to this node
              let leafNode = replacementNode.left;
              let leftNode = currentNode.left;
    
              if (!leafNode) {
                replacementNode.left = leftNode;
              }
    
              while (leafNode) {
                if (leftNode.data > leafNode.data) {
                  if (leafNode.right === null) {
                    leafNode.right = leftNode;
                    break;
                  }
                  leafNode = leafNode.right;
                }
    
                if (leftNode.data < leafNode.data) {
                  if (leafNode.left === null) {
                    leafNode.left = leftNode;
                    break;
                  }
                  leafNode = leafNode.left;
                }
              }
    
              if (value > previousNode.data) {
                return (previousNode.right = replacementNode);
              }
              return (previousNode.left = replacementNode);
            }
          }
        }
    }
    find(value){
        let temp = this.root;
        while(temp){
            if(temp.data === value) return value;
            if(value > temp.data) temp = temp.right;
            else temp = temp.left;
        }
        return null;
    }
    levelOrder(callback){
        const queue = [];
        queue.push(this.root);
    
        while (queue.length > 0) {
          if(callback) callback(queue[0]);
          if (queue[0].left !== null) queue.push(queue[0].left);
          if (queue[0].right !== null) queue.push(queue[0].right);
          queue.shift();
        }
    }
    inOrder(callback, root = this.root){
      if(root === null) return;
      this.inOrder(callback,root.left);
      if(callback) callback(root.data);
      // console.log(root.data);
      this.inOrder(callback,root.right);
    }
    preOrder(callback, root = this.root){
      if(root === null) return;
      if(callback) callback(root.data);
      this.preOrder(callback,root.left);
      // console.log(root.data);
      this.preOrder(callback,root.right);
    }
    postOrder(callback, root = this.root){
      if(root === null) return;
      this.postOrder(callback,root.left);
      // console.log(root.data);
      this.postOrder(callback,root.right);
      if(callback) callback(root.data);
    }
    height(node){
      const traverse = (root) => {
        if (root === null) {
          return 0;
        }
        let left = traverse(root.left);
        let right = traverse(root.right);
        return left > right ? left + 1 : right + 1;
      };
      return traverse(this.root);
    }
    depth(value) {
      const traverse = (root, depth = 0) => {
        if (root === null) {
         return -1;
        }
        if (root.data === value) {
         return depth;
        }
        let left = traverse(root.left, depth + 1);
       let right = traverse(root.right, depth + 1);
       return left > right ? left : right;
    };
    return traverse(this.root);
  }
  isBalanced() {
    const getHeight = (root) => {
      if (root === null) {
        return 0;
      }
      let left = getHeight(root.left);
      let right = getHeight(root.right);
      return left > right ? left + 1 : right + 1;
    };

    const balanced = (root) => {
      if (root === null) return true;
      let left = getHeight(root.left);
      let right = getHeight(root.right);

      let diff = Math.abs(left - right);
      if (diff > 1) return false;
      return balanced(root.left) && balanced(root.right);
    };
    return balanced(this.root);
  }
  rebalance() {
    let arrInOrder = this.inOrder();
    this.root = this.buildTree(arrInOrder);
  }
}
function log(node){
  console.log(node);
}
function bst(array, left, right){
    if(right < left) return null;
    
    let mid = Math.floor((left + right) / 2);

    let node = new Node(array[mid]);
    node.left = bst(array, left, mid - 1);
    node.right = bst(array, mid + 1, right);

    return node;
}
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

a = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
a.buildTree();
a.inOrder(log);
a.preOrder(log);
a.postOrder(log);