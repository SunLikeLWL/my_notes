# Nuxtjs

2019年11月15日15:17:33








## 异步数据

Nuxt.js扩展了Vue.js，增加了一个叫asyncData的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。


import axios from 'axios';

const myaxios = axios.create({

})

myaxios.interceptors.response.use(function(response){
    return response.data;
},function(error){

})




###  返回promise



export default{
    asyncData ({params}){
        return axios.get("")
        .then((res)=>{
            return {
                title: res.data.title
            }
        })
    }
}



### 使用async或await


export default {
    async asyncData({params}){
         const {data} = await axios.get("");
         return {title: data.title}
    } 
}


### 使用回调函数
export default{
    asyncData({params},callback)
    .then((res)=>{
        callback(null,{
            title: res.data.title
        })
    })
}

### 返回对象
如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。

export default {
    data(){
        return {foo:'bar'}
    }
}


### 数据展示

asyncData方法返回的数据在融合data方法返回的数据后，一并返回模板进行展示

<template>
  <h1>{{title}}</h1>
</template>






## Vuex状态树

对于每个大项目来说，使用状态树（state）管理状态（staye）十分有必要。这就是为什么Nuxtjs内核实现了Vuex。

