Function.prototype.customBind = function(context,...bindArgs){
    const self = this;
    return  function(...args){
        const  newArgs = bindArgs.concat(args)
        return self.apply(context,newArgs) 
    }
}
