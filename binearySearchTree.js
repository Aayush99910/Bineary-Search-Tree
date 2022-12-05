// importing mergeSort from the merge.js
import mergeSort from "../merge.js";


// class of node 
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}


// class of tree
class Tree {
  constructor(array) {
    mergeSort(array);
    this.array = this.removeDuplicate(array);
    this.root = this.buildTree(this.array);
    this.isfirstNode = true;
    this.deep = 0;
    this.newArray = [];
  }


  // builds a tree and returns its root node
  buildTree(array) {
    let arrayLength = array.length;

    // returns if the given array's length is zero
    if (arrayLength === 0) return null;

    let start = 0; // starting point
    let end = arrayLength - 1; // ending point
    let middlePoint = parseInt((start + end) / 2); // middle point of the array
    let ArrayLeft = []; // left half array
    let ArrayRight = []; // right half array

    // looping through the array and 
    // adding to left half array and right half array
    array.forEach((number, index) => {
      if (index < middlePoint) {
        ArrayLeft.push(number);
      } else if (index > middlePoint) {
        ArrayRight.push(number);
      }
    });


    // creates a new node and creates it left and right node too
    let node = new Node(array[middlePoint], this.buildTree(ArrayLeft), this.buildTree(ArrayRight));
    return node; // returns the node
  }


  // removes duplicate value in an array
  removeDuplicate(array) {
    let uniqueArray = []; // array with unique individual item
        
    // Loop through array values
    for(let i = 0; i < array.length; i++){
      if(uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }

    return uniqueArray;
  }

  // inserting a value in the bineary search tree
  insert(value) {
    let currentNode = this.root;
    
    // repeats till both the left and right pointer are
    // pointing towards null
    while(currentNode.left != null || currentNode.right != null) {
      // if the value is less than current data
      // currentNode is assigned to leftnode of currentNode
      // Also if empty space is found we make a new node there
      // works similarly when the value is greater 
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
        }else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
        }else {
          currentNode = currentNode.right;
        }
      }
    }


    // when we reach a leaf node this executes
    // it makes a new node and appends it there
    if ((currentNode.left == null || currentNode.right === null) && value < currentNode.data) {
      currentNode.left = new Node(value);
    } else if ((currentNode.left == null || currentNode.right === null) && value > currentNode.data) {
      currentNode.right = new Node(value);
    }
  }

  
  // deletes a node from the tree
  deleteNode(value) {
    let currentNode = this.root;
    let parentNode;
    
    while(currentNode.left != null || currentNode.right != null) {
      if (value === currentNode.data) {
        if (parentNode.left === currentNode) {
          if (currentNode.right != null) {
            parentNode.left = currentNode.right;
            currentNode.right = null;
          } else if (currentNode.left != null) {
            parentNode.left = currentNode.left;
            currentNode.left = null;
          }
        } else if (parentNode.right === currentNode) {
          if (currentNode.right != null) {
            parentNode.right = currentNode.right;
            currentNode.right = null;
          } else if (currentNode.left != null) {
            parentNode.left = currentNode.left;
            currentNode.left = null;
          }
        }
        return;
      } else if (value < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }

    if (currentNode.left === null && currentNode.right === null && value === currentNode.data) {
      if (parentNode.left === currentNode) {
        parentNode.left = null;
      } else if (parentNode.right === currentNode) {
        parentNode.right = null;
      }
    }
  }


  // finds the node and returns that node
  find(value) {
    let currentNode = this.root;
    
    while (currentNode.left !== null || currentNode.right !== null) {
      if (value === currentNode.data) {
        return currentNode;
      }else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } 
    }

    if (currentNode.left === null && currentNode.right === null && value === currentNode.data) {
      return currentNode;
    }

    return "Value doesn't exist in the tree";
  }


  // traverse the tree in level order
  levelOrder(callbackFn) {
    let currentNode = this.root;
    if (currentNode === null) {
      return;
    }

    let queue = [currentNode];
    
    while(queue.length !== 0) {
      callbackFn(currentNode.data);
      queue.shift();
      if (currentNode.left !== null) { 
        queue.push(currentNode.left);
      } 

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }

      currentNode = queue[0];
    }
  }


  // traverse the tree in inorder
  inOrder(callbackFn, currentNode = this.root, isCalledFromRebalanced) {
    if (currentNode === null) {
      return;
    }

    if (isCalledFromRebalanced) {
      this.inOrder(callbackFn, currentNode.left, true);
      this.newArray.push(callbackFn(currentNode.data));
      this.inOrder(callbackFn, currentNode.right, true);
    } else {
      this.inOrder(callbackFn, currentNode.left);
      callbackFn(currentNode.data);
      this.inOrder(callbackFn, currentNode.right);
    }
  }


  // traverse the tree in preOrder
  preOrder(callbackFn, currentNode = this.root) {
    if (currentNode === null) {
      return;
    }

    callbackFn(currentNode.data);
    this.preOrder(callbackFn, currentNode.left);
    this.preOrder(callbackFn, currentNode.right);
  }


  // traverse the tree in postOrder
  postOrder(callbackFn, currentNode = this.root) {
    if (currentNode === null) {
      return;
    }

    this.postOrder(callbackFn, currentNode.left);
    this.postOrder(callbackFn, currentNode.right);
    callbackFn(currentNode.data);
  }


  // height of a given node
  height(currentNode = this.root) {
    // easier way here is to do this
    // Either way works but I think this is better 
    /* 
      if (currentNode === null) {
        return -1;
      }

      let leftHeight = this.height(currentNode.left);
      let rightHeight = this.height(currentNode.right);

      return Math.max(leftHeight, rightHeight) + 1;
    */
    let passedNode;
    if (this.isfirstNode === true) {
      passedNode = currentNode;
      this.isfirstNode = false;
    }

    if (currentNode === null) {
      return 0;
    }

    let leftHeight = this.height(currentNode.left);
    let rightHeight = this.height(currentNode.right);

    if(currentNode === passedNode) {
      return Math.max(leftHeight, rightHeight);
    } 

    return Math.max(leftHeight, rightHeight) + 1;
  }


  // returns the depth
  depth(node = this.root) {
    let passedNode;
    let currentNode = this.root;

    if (this.isfirstNode === true) {
      passedNode = node;
      this.isfirstNode = false;
    }

    if (node === null) {
      return 0;
    }

    while(currentNode.left != null || currentNode.right != null) {
      if (passedNode.data === currentNode.data) {
        return this.deep;
      } else if (passedNode.data > currentNode.data) {
        currentNode = currentNode.right;
        this.deep++;
      } else if (passedNode.data < currentNode.data) {
        currentNode = currentNode.left;
        this.deep++;
      }
    }

    if (currentNode.left === null && currentNode.right === null && passedNode.data === currentNode.data) {
      return this.deep;
    } 
  }


  // determines if the tree is balanced or not
  isBalanced(currentNode = this.root) {
    let passedNode;
    if (this.isfirstNode === true) {
      passedNode = currentNode;
      this.isfirstNode = false;
    }

    if (currentNode === null) {
      return 0;
    }

    let leftHeight = this.isBalanced(currentNode.left);
    let rightHeight = this.isBalanced(currentNode.right);

    if(currentNode === passedNode) {
      if (leftHeight > rightHeight + 1 || rightHeight > leftHeight + 1) {
        return false;
      }
      return true;
    } 

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    if (this.isBalanced()) return;  // Avoids uselessly running code if tree is already balanced. 

    // Get all node data values
    this.inOrder(this.buildArray, this.root, true);

    // Rebuild tree
    this.root = this.buildTree(this.newArray);
  }


  // builds a new array whenever rebalance is called
  buildArray(value) {
    return value;
  }
}


// function which prints the tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const tree = new Tree([22, 15, 8, 10, 56, 68, 12, 2, 20, 18, 16]);
tree.insert(1);
tree.deleteNode(8);
tree.deleteNode(2);
tree.deleteNode(1);
tree.deleteNode(10);
tree.deleteNode(56);
prettyPrint(tree.root);