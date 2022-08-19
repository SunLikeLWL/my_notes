

function EventBus(){
    const events = {}

    function on(type,fn,isOnce){
        if(events[type] === null){
            events[type] = []
        }
        events[type].push({fn,isOnce})
    } 


    function once(type,fn){
        this.on(type,fn,true)
    }

    function off(type,fn){
       if(!fn){
           events[type] = []
       }else{
           const fnList = events[type]
           if(fnList){
               events[type] = fn.filter(item => item.fn!== fn)
           }
       }
    }

    function emit(type,...args){
       const fnList = events[type]
       if(fnList === null) return 

       events[type] = fnList.filter(item=>{
           const {fn,isOnce} = item
           fn(...args)
           if(!isOnce) return true
           return false
       })

    }
}
