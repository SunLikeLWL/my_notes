# vue-router

2019年11月15日15:18:47

## 动态路由匹配
我们经常把某种模式匹配到的所有路由，全都映射到同一个组件上。

const user = {
    template:"<div>User</div>"
}


const router = new VueRouter({
    routes:[
         <!-- 动态路径参数 以冒号开头 -->
         {
             path:"/user/:id",component:User
         }
    ]
})



## 嵌套路由

实际生活中的应用界面，通常由多个嵌套的组件组合而成。
同样地，URL中各段动态路径也按某种结构对应嵌套的各层组件





## 编程式的导航

除了使用<router-link></router-link>

创建a标签来定义导航链接，我们还可以借助router的实例方法，通过编写代码来是实现

router.push(location,onComplete?,onAbort?)


router.replace(location,onComplete?,onAbort?)



router.go(n)
这个方法的参数是一个整数意思是在history记录中向前或者向后退多少步，类似window.history.go(n)


操作history



## 命名路由

有时候，通过一个名称来识别一个路由显得更方便一些，特别是在连接一个路由，或者是执行
一些跳转的时候。你可以创建Router实例的时候，在routes配置中给某个路由设置名称


const router = new VueRouter({
    routes:[
        path:"/user/:userId",
        name:"user",
        component:User
    ]
})

<route-link :to="{{name:'user',params:{userId:123}}}">User</route-link>

这跟代码调用 router.psuh({name:"user",params:{userId:123}}) 是一回事



## 命名视图

有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有silebar（测导航）和main
（主内容）每个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，
而不是只有一个单独的出口。如果router-view没有设置名字，那么默认为default


<router-view class = "view one"></router-view>
<router-view class = "view two" name="a"></router-view>
<router-view class = "view three" name="b"></router-view>

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。
确保正确使用components配置

const router = new VueRouter({
    routes:[
        {
            path:"/",
            componnets:{
                default:Foo,
                a:Bar,
                b:Baz
            }
        }
    ]
})



## 嵌套命名视图

我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要
命名用到的嵌套router-view组件。

<div>
    <h1>User Setting</h1>
    <NavBar/>
    <router-view/>
    <router-view name="helper"/>
</div>

{
    path:"/settings",
    component:UserSettings,
    childdren:[{
        path:"emails",
        component:UserEmailSubComponents
    },{
        path:"profile",
        components:{
            default:UserProfile,
            helper:UserProfilePreview
        }
    }]
}



## 重定向和别名

重定向也是通过routes配置来完成，下面的例子是从a/ 重定向到/b


const router = new VueRouter({
    routes:[
        {
            path:"/a",redirect:"/b"
        }
    ]
})


重定向的目标也可以是一个命名路由：
const router = new VueRouter({
    routes:[
        {
           path:"/a",redirect:{name:"foo"}
        }
    ]
})

甚至可以是一个方法，动态返回重定向目标

const router = new VueRouter({
    routes:[
        {
            path:"/a",redirect:to=>{
                <!-- 方法接收 目标路由 作为参数 -->
                <!-- return 重定向 字符串路径/路径对象 -->
            }
        }
    ]
})


## 别名

“重定向”的意思是，当用户访问/a时，URL将会被替换成/b，然后匹配路由为/b

a/的别名是b/，意味着，当用户访问/b时，URL会保持为/b，但是路由匹配则为/a，
就像用户访问/a一样

const router = new VueRouter({
    routes:[
        {path:"/a",component:A,alias:'/b'}
    ]
})

“别名”的功能让你可以自由地讲UI结构映射到任意的URL，而不是受限于配置的嵌套路由结构。



## 路由组件传参

在组件中使用$route会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的URL上使用，
限制了其灵活性。



## HTML5 history模式


vue-router默认hash模式--使用URL的hash来模拟一个完整的URL，于是当URL改变时，页面不会重新加载


## 导航守卫

vue-router提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的，单个路由独享的，或者组件级的。


参数或查询的改变并不会触发进入/离开的导航守卫



### 全局导航守卫


使用router.beforeEach注册一个全局前置的导航守卫

const router = new VueRouter({

})


router.beforeEach((to,from,next)=>{

})

当导航守卫触发时，全局前置守卫按照创建的顺序调用。
守卫是异步解析执行，此时导航在所有守卫resolve完之前一直处于等待中



#### 参数

to: Route: 即将要进入的目标路由对象

from: Route 当前导航真要离开的的路由

next: Function 一定要调用改方法来resolve这个钩子。执行效果依赖next方法的调用参数
1、next()：进行管道中的下一个钩子。如果钩子执行完了，则导航的状态就是comfirmed（确认的）。
2、next(false): 中断当前的导航。如果浏览器的URL改变了（可能是用户手动或者浏览器后退按钮），那么URL地址会重置到from路由对应的地址。
3、next('/') 或者next({path:'/'}):跳转到一个不同的地址


### 全局解析守卫

可以使用router.beforeResolve