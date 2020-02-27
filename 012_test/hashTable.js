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