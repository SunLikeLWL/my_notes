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