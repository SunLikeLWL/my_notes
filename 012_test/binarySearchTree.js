function BinarySearchTree(){
    var Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null;
    this.insert = function(key){
        var newNode = new Node(key);
        if(root === null){
            root = newNode;
        }
        else{
            insertNode(root,newNode);
        }
    }

    var insertNode = function(node,newNode){
        if(newNode.key<node.key){
            if(node.left === null){
                node.left = newNode;
            }
            else{
                insertNode(node.left,newNode);
            }
        }
        else{
            if(node.right=== null){
                node.right = newNode;
            }
            else{
                insertNode(node.right,newNode);
            }
        }
    }
    // 中序遍历
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root,callback);
    }
    var inOrderTraverseNode = function(node,callback){
      if(node!==null){
          inOrderTraverseNode(node.left);
          callback(node.key);
          inOrderTraverseNode(node.right,callback);
      }
    }

    // 先序遍历
    this.prePrderTraverse  = function(callback){
        preOrderTraverseNode(root,callback);
    }

    var preOrderTraverseNode = function(node,callback){
        if(node!==null){
            callback(node.key);
            preOrderTraverseNode(node.left,callback);
            parOrderTraverseNode(node.rigth,callback);
        }
    }

    // 后续遍历
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root,callback);
    }

    var postOrderTraverseNode = function(node,callback){
        if(node!==null){
            postOrderTraverseNode = function(node,callback){
                if(node!==null){
                    postOrderTraverseNode(node.left,callback);
                    postOrderTraverseNode(node.right,callback);
                    callback(node.key);
                }
            }
        }
    }
   
    // 找树的最小值
    this.min = function(){
        return minNode(root);
    }

    var minNode = function(node){
        if(node){
            while(node&& node.left!==null){
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    // 找树的最大值

    this.max = function(){
        return maxNode(root);
    }

    var maxNode = function(node){
        if(node){
            while(node&& node.right!==null){
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    //  搜索一个特定的值
     this.search = function(key){
        return searchNode(root,key);
     };

     var searchNode = function(node,key){  
         if(node===null){
             return false;
         }
         if(key<node.key){
             return searchNode(node.left,key);
         }
         else if(key>node.key){
             return searchNode(node.right,key);
         }
         else{
             return true;
         }
     }

     this.remove = function(key){
         root = removeNode(root,key);
     }

     var removeNode = function(node,key){
        
         if(node===null){
             return null;
         }
         if(key<node.key){
             node.left = removeNode(node.left,key);
         }
         else if(key>node.key){
             node.right = removeNode(node.right,key);
             return node;
         }
         else{
             //  第一种情况，只有的一个叶节点
             if(node.left===null&&node.right===null){
                 node = null;
                 return node;
             }
            //  第二种情况，只有一个子节点的节点
             else if(node.left === null){
               node = node.right;
               return node;
             }
             else if(node.right===null){
                 node  = node.left;
                 return node;
             }
            //  第三种情况，有两个子节点的节点
             var aux  = findMinNode(node.right);
             node.key = aux.key;
             node.right = removeNode(node.right,aux.key);
             return node;

         }
     }
} 