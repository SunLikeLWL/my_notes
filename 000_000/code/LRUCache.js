class LRUCache{
    private length:number;
    private data:Map<any,any> = new Map()
    constructor(length:number){
        if(length<1) return new Error('invalid length')
        this.length = length
    }
    set(key:any,value:any){
        const data = this.data;
        if(data.has(key)){
            data.delete(key)    
        }
        data.set(key,value)
        // 
        if(data.size>this.length){
            const delKey = data.keys.next().value
            data.delete(delKey)
        }
    }
    get(key:any){
      const data = this.data
      if(!data.has(key)) return null
      const value = date.get(key)
      data.delete(key)
      data.set(key,value)
      return value
    }
}