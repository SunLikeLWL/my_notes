// 字典
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



// 图  
 function Graph(){
    var vertices =  [];// 存储定点名字
    var adjList= new Dictionary();// 存储邻接表
    // 添加一新节点
    this.addVertex = function(v){
        vertices.push(v); //添加定点
        adjList.set(v,[]);// 添加边
    }
    this.addEdge = function(v,w){
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    }
    this.toString = function(){
        var s = '';
        for(var i=0;i<vertices.length;i++){
            s+=vertices[i]+'->';
            var neighbors = adjList.get(vertices[i]);
            for(var j = 0;j<neighbors.length;i++){
                s+=neighbors[j]+" ";
            } 
            s+= '\n';
        }
        return s;
    }

    // 广度优先遍历
    var initializeColor = function(){
        var color = [];
        for(var i =0;i<vertices.length;i++){
             color[vertices[i]] = 'white';
        }
        return color;
    };
    this.bfs = function(v,callback){
        var color = initializeColor();
        var queue = new queue();
        queue.enqueue(v);
        while(!queue.isEmpty()){
            var u = queue.dequeue();
            var neighbors = adjList.get(u);
            color[u] =  'grey';
            for(var i=0;i<neighbors.length;i++){
                var w = neighbors[i];
                if(color[w] === 'white'){
                    color[w] ='grey';
                    queue.enqueue(w)
                }
            }
            color[u] = 'black';
            if(callback){
                callback(u);
            }
        }
    }
}

