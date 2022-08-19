
function cloneDeep(obj,map = new WeakMap()){
    if(typeof obj!== 'object' || obj === null) return obj

    //避免循环引用

    const objFromMap = map.get(obj)
    if(objFromMap) return objFromMap

    let target = {}
    map.set(obj,target)


    if(obj instanceof Map){
        target = new Map()
        obj.forEach((v,k)=>{
            const v1 = cloneDeep(v,map)
            const k1 = cloneDeep(k,map)
            target.set(k1,v1)
        })
    }

    if(obj instanceof Set){
        target = new Set()
        obj.forEach(v =>{
            const v1 = cloneDeep(v,map)
            target.add(v1)
        })
    }

    if(obj instanceof Array){
        target = obj.map(item=>cloneDeep(item,map))
    }

    for(const key in obj){
        const val = obj[key]
        const val1 = cloneDeep(val,map)
        target[key] = val1
    }


    return target
}

