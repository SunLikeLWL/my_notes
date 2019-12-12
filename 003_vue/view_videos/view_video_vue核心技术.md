

## 定义指令


<body>
<div id = 'test1'>
   <p v-upper-text='msg1'></p>    
   <p v-lower-text='msg1'></p>  
<div>


<div id = 'test2'>
   <p v-upper-text='msg2'></p>    
   <p v-lower-text='msg2'></p>  
<div>
</body>


<script>
// 定义全局指令
// el:指令属性所在的标签对象
// binding： 包含指令相关信息数据的对象

Vue.directive("upper-text",function(el,binding){
    console.log(el,binding)
    el.textContent = binding.value.toUpperCase();
})

new Vue({
    el:"#test1",
    data:{
        msg1:"test1"
    },
    directives:{
        'lower-text'(el,binding){
            el.textContent = binding.value.toLowerCase();

        }
    }
})



new Vue({
    el:"#test2",
    data:{
        msg2:"test2"
    },
    directives:{
        'lower-text'(el,binding){
            el.textContent = binding.value.toLowerCase();

        }
    }
})



</script>





## 定义插件


<!-- vue-myPlugin.vue -->

(function(){
  <!-- 需要向外暴露的插件对象 -->
  const MyPlugin = {};
  MyPlugin.install = function(Vue,options){
    <!-- 1、添加全局方法或属性 -->
    Vue.myGlobalMethod= function(){
      console.log("Vue 函数对象的方法myGlobalMethod");
    }
    <!-- 2、添加全局资源 -->
    Vue.directive("my-directive",function(el,binding){
      el.textContent = binding.value.toUpperCase();
    })

    <!-- 4、添加实例方法 -->
    Vue.propotype.$myMethod = function(){
      console.log("Vue 实例对象的方法$myMethod()");
    }
  }
  
   window.MyPlugin = MyPlugin;
})


<!-- text.vue -->

<script src='../vue-myPlugin'></script>


<!-- 声明使用插件 -->
Vue.use(MyPlugin);
<!-- 内部会执行MyPlugin.install(Vue) -->

Vue.myGlobalMethod();


