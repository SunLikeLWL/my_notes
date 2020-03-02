# 学习Javascript数据结构与算法


## 4.1 队列

1、队列遵循FIFO（先进先出）原则；

2、队列从尾部添加新元素unshift()，并从顶部移除元素unshift()

function Queue(){
    var items = [];
    this.enqueue = function(element){
        items.push(element);
    }
    this.dequeue=function(){
        return items.shift();
    }
    this.front = function(){
        return items[0];
    }
    this.isEmpty=function(){
        return items.length == 0;
    }
    this.clear = function(){
        items = [];
    }
    this.size = function(){
        return items.length;
    }
    this.print = function(){
        console.log(items.toString());
    }
}


## 4.2 优先队列

1、设置优先级，然后在正确的位置添加元素

2、用入队操作添加元素，然后按照优先级移除元素

function PriorityQueue(){
    var items = [];
    function QueueElement(element,priority){
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function(element,priority){
        var queueElement = new QueueElement(element,priority);
        // 如果队列是空的可以直接入队
        if(this.isEmpty()){
            items.push(queueElement);
        }
        // 队列不是空的则在队列中找到第一个比他优先级低的并插入到其前面
        else{
            var added = false;
           for(var i=0;i<items.length;i++){
               if(queueElement.priority<items[i].priority){
                   items.splice(i,0,queueElement);
                   added = true;
                   break;
                }
           }
        //    如果遍历完队列都找不到优先级比他小的就放到队列最后
           if(!added){
               items.push()
           }
        }
    }
}

## 循环队列


function hotPotato(nameList,num){
    var queue = new Queue();
    for(var i=0;i<nameList.length;i++){
        queue.enqueue(nameList[i]);
    }

    var eliminated = '';
    while(queue.size()>1){
        for(var i=0;i<num;i++){
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
        console.log(eliminated+"在击鼓传花游戏中淘汰。");
    }
    return queue.dequeue();
}
var name =  ["John","Camila","Ingrid","Carl"];
var winner = hotPotato(name,3);
console.log("胜利者："+winner);



## 5.0 链表


## 5.1 


function linkedList() {
    var Node = function (element) {
        this.element = element;
        this.text = null;
    }

    var length = 0;
    var head = null;
    this.append = function (element) {
        var node = new Node(element);
        var current;
        if (head === null) {
            head = node;
        }
        else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length++;
    }

    this.insert = function (position, element) {
        if(position>=0&&position<=length){
            var node = new Node(element),
            current = head,
            previous,
            index  =0;
            if(position===0){
                node.next = current;
                head = node;
            }
            else{
                while(index++<position){
                      previous = current;
                     current = current.next;
                }
                node.next = current;
                current = current.next;
            }
          length++;
          return true;
        }
        else{
            return false;
        }
        
       
    }

    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            var current = head,
                previous,
                index = 0;
                if(position===0){
                    head = current.next;
                }
                else{
                    while(index++<position){
                        previous = current;
                        current = current.next;
                    }
                    previous.next =  current.next;
                }
                length--;
                return current.element;
        }
        else{
            return null;
        }
    }

    this.remove = function (element) {
       var index = this.indexOf(element)
       return this.removeAt(index);
    }
    this.indexOf = function (element) {
      var current = head;
      index = -1;
      while(current){
          if(element===current.element){
              return index;
          }
          index++;
          current = current.next;
      }
      return -1;
    }
    this.isEmpty = function () {
     return length === 0;
    }
    this.size = function () {
      return length;
    }
    this.toString = function () {
        var current  =head;
        while(current){
            string+=','+current.element;
            current = current.next;
        }
        return string.slice(1);
    }
    this.print = function () {
      console.log(this.toString())
    }
    this.getHead = function(){
        return head;
    }
}


## 5.2 双向链表





function DoublyLinkedLit(){
    var Node = function(element){
        this.element = element;
        this.next = null;
        this.prev = null;
    }
    var length = 0;
    var head = null;
    var tail = null;
    this.insert = function(position,element){
        if(position>=0&&position<=length){
            var node = new Node(element);
            var current = head;
            var previous;
            var index = 0;
            if(position===0){
                if(!head){
                    head = node;
                    tail = node;
                }
                else{
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            }
            else if(position===length){
                current  = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            }
            else{
                while(index++<position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next  =node;
                current.prev = node;
                node.prev = previous;
            }
            length++;
            return true;
        }
        else{
            return false;
        }
    }
    this.removeAt = function(position){
        if(position>-1&&postion<length){
            var current =  head;
            var previous;
            var index = 0;
            if(position ==0){
                head = current.next;
                if(length===1){
                    tail = null;
                }
                else{
                    head.prev = null;
                }
            }
            else if(position===length-1){
                current = tail;
                tail = current.prev;
                tail.next = null;
            }
            else{
                while(index++<position){
                    previous  = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;

            }
            length--;
            return current.element;
        }
        else{
            return null;
        }
    }
}


## 5.3循环链表


1、循环链表

2、双向循环链表




## 6、集合

function Set(){
    var items = {};
    this.has = function(value){
        return value in items;
    }
    this.add = function(value){
        if(!this.has(value)){
            items[value] = value;
            return true;
        }
        return false;
    }
    this.remove = function(value){
        if(this.has(value)){
            delete items[value];
            return true;
        }
        return false;
    }
    this.sizs = function(){
        return Object.keys(items).length;
    }
    this.sizeLegacy = function(){
        var count =  0;
        for(var prop in items){
            if(items.hasOwnProperty(prop))
            ++count;
        }
        return count;
    }
    this.values = function(){
        return Objects.keys(items);
    }
    this.valuesLegacy = function(){
        var keys = [];
        for(var key in items){
            keys.push(key);
        }
        return keys;
    }
    this.union = function(otherSet){
        var unionSet = new Set();
        var values = this.values();
        for(var i=0;i<values.length;i++){
            unionSet.add(values[i]);
        }

        values = otherSet.values();

        for(var i=0;i<values.length;i++){
            unionSet.add(values[i]);
        }
        return unionSet;
    }
    this.intersection = function(otherSet){
        var intersectionSet = new Set();
        var values = this.values();
        for(var i=0;i<values.length;i++){
            if(otherSet.has(values[i])){
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    this.difference = function(otherSet){
        var differenceSet = new Set();
        var values = this.values();
        for(var i=0;i<values.length;i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    }
    this.subset = function(otherSet){
        if(this.size()<otherSet.size()){
            return false;
        }
        else{
            var values = this.values();
            if(!otherSet.has(values[i])){
                return false;
            }
        }
        return true;
    }
}


## 字典和散列表


function Dictionary(){
    var items = {};
    this.has = function(key){
        return key in items;
    }
    this.set = function(key,value){
        items[key] = value;
    }
    this.remove = function(key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    }
    this.get = function(key){
       return this.has(key)?items[key]:null;
    }
    this.values = function(){
        var values = [];
        for(var k in items){
            if(this.has(k)){
                values.push(items[k]);
            }
        }
        return values;
    }
    this.getItems = function(){
        return items;
    }
}



## 散列表


function hashTable(){
    var table = [];
    var loseloseHashCode = function(key){
        var hash = 0;
        for(var i=0;i<key.length;i++){
            hash+=key.charCodeAt(i);
        }
        return hash%37;
    }
    this.put = function(key,value){
        var position = loseloseHashCode(key);
        console.log(position+"-"+key);
        table[position] =  value;
    }
    this.get = function(key){
        return table[loseloseHashCode(key)];
    }
    this.remove = function(key){
        table[loseloseHashCode(key)] = undefined;
    }
    this.print = function(){
        for(var i=0;i<table.length;i++){
            if(table[i]!==undefined){
                console.log(i+":"+table[i]);
            }
        }
    }
}


var ValuePair = function(key,value){
    this.key = key;
    this.value = value;
    this.toString = function(){
        return '['+this.key+'-'+this.value+']';
    }
    this.put = function(key,value){
        var position = loseloseHashCode(key);
        if(table[position]==undefined){
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key,value))
    }
    this.get = function(key){
        var position = loseloseHashCode(key);
        if(table[position]!==undefined){
            var current = table[position].getHead();
            while(current.next){
                if(current.element.key===key){
                    return current.element.value;
                }
                current= current.next;
            }
            if(current.element.key===key){
                return current.element.value;
            }
        }
        return undefined;
    }
    this.remove = function(key){
        var position = loseloseHashCode(key);
        if(table[position]!==undefined){
            var curent = table[position].getHead();
            while(current.next){
                if(current.element.key===key){
                    table[position].remove(current);
                    if(table[position].isEmpty()){
                        table[position] = undefined;
                    }
                    return true;
                }
                current = curent.next;
            }
            if(current.element.key===key){
                table[position].remove(current.element);
                if(table[position].isEmpty()){
                    table[position]= undefined;
                }
                return true;
            }
        }
        return false;  
    }
    this.put = function(key,value){
        var position = loseloseHashCode(key);
        if(table[position]==undefined){
            table[position]  = new ValuePair(key,value);
        }
        else{
            var index = ++position;
            while(table[index]!=undefined){
                index++;
            }
            table[index] = new ValuePair(key,value);
        }
    }
    this.get = function(key){
        var position = loseloseHashCode(key);
        if(table[position]!==undefined){
            if(table[position].key===key){
                return table[position].value;
            }
            else{
                var index = ++position;
                while(table[index]===undefined||table[index].key!==key){
                  index++;
                }
                if(table[index].key===key){
                    return table[index].value;
                }
            }
        }
        return undefined;
    }
    this.remove = function(key){
        var postion = loseloseHashCode(key);
        if(table[postion]!==undefined){
            if(table[position].key===key){
                table[index] = undefined;
            }
            else{
                var index = ++postion;
                while(table[index]===undefined || table[index].key!==key){
                    index++;
                }
                if(table[index].key===key){
                    table[index] =undefined;
                }
            }
        }
    }
}



var dj2HashCode = function(key){
    var hash = 5381;
    for(var i=0;i<key.length;i++){
        hash = hash*33+key.charCodeAt(i);
    }
    return hash% 1013;
}


## 第八章 树



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







## 第九章 图

图是网页结构的抽象模型。图示一组由边连接的节点



由一条边连接在一起的定点称为相邻定点



图最简单的实现是邻接矩阵。每个节点都和一个整数相关联，该整数讲作为数组的索引。








