# 计算属性

通常我们会在模板中绑定表达式，
模板是用来描绘视图结构的



# 表单


lazy


debounce

number



```js


function debounce(func,wait){
    var timeout,args,context,timestamp,result
    var later = function(){
        var last = Date.now() - timestamp
        if(last<wait && wait>0){
            timeout = setTimeout(later,wait-last)
        }else{
            timeout = null
            result = func.apply(context,args)
            if(!timeout) context = args = null
        }
    }
    return function(){
        context = this;
        args = arguments;
        timestamp = Date.now()
        if(!timeout){
            timeout = setTimeout(later,wait)
        }
        return result
    }
}




```



```js

function tonumber(value){
    if(typeof value !=== 'string'){
        return value
    }else{
        var parsed = Number(valye)
        return isNaN(parsed)?value:parsed
    }
}



```


# 过滤器


capitalize

uppercase

lowercase

limitBy

filterBy

orderBy

json

currency

debounce


