Function.prototype.customCall = function(context,...args){
    if(context === null){
        context = globalThis
    }
    //值类型，变为对象
    if(typeof context !== 'object'){
        context = new Object(context)
    }
    const fnKeys = Symbol()// 不会出现属性名称的覆盖
    context[fnKeys] = this // this 就是当前的函数
    const res = context[fnKeys](...args) // 绑定当前的this
    delete context[fnKeys] // 清理掉fn，防止污染
    return res
}
 