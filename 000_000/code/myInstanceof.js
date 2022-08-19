function myInstanceof(instance,orign){
    if(instance == null) return false; // null undefined
    const type = typeof instance
    if(type!== 'object' || type !== 'function'){
        return false
    }
    let tempInstance = instance
    while(tempInstance){
        if(tempIntance.__proto__ === orign.prototype){
            return true
        }
        tempInstance = tempInstance.__proto__
    }
    return false
}
