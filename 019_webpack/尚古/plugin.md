# plugin


### 作用：

通过插件可以扩展webpack，加入自定义的构建行为，
使webpack可以执行更广泛的任务，拥有更强的构建能力

### 工作原理
webpck在编译代码过程中，会触发一系列的tapable钩子事件，
插件所做的，就是找到相应的钩子，往上面挂载自己的任务，
也就是注册事件，这样当webpack构建的时候，插件注册事件就会随着钩子的触发而执行



### webpack内部的钩子

钩子：
钩子的本质就是事件，为了方便我们直接介入和控制编译过程，
webpack把编译过程中触发的各类关键事件封装成事件接口暴露了出来。
这些接口被很形象地称做hooks（钩子）


### Tapable

Tapable为webpack提供了统一的插件接口（钩子）类型定义，
他是webpack的核心功能库
webpack中目前有十种hooks，
在Tapable源码中可以看到


```js

/*
1、webpack加载webpack.config.js中所有配置，
此时就会new TestPlugin(),执行插件的constructor

2、webpack创建compiler对象

3、遍历所有plugins中插件，调用插件的applay方法

4、执行剩下的编译流程（触发各个hooks事件）


*/

class testPlugin{
    constructor(){
        console.log('test plugin constructor')
    }
    apply(compiler){
        console.log('testplugin apply')

    }
}
module.exports = TestPlugin




```






### CleanWebpackPlugin


1、作用：在webpack打包输出前将上次打包内容清空

2、开发思路：
   如何在打包输出前执行？需要使用compiler.hooks.emit钩子，他是打包输出前触发
   如何清空上次打包内容？
       获取打包输出目录：通过compiler对象
       通过文件操作清空内容：通过compiler.outputFileSystem操作文件


```js


class CleanWebpackPlugin{
    apply(compiler){
        // 获取操作文件的对象
        const fs = compiler.outputFileSystem
        compiler.hooks.tapAsync('CleanWebpackPlugin',(compilation,callback)=>{
            // 获取输出文件目录
            const outputPath = compiler.options.output.path
            // 删除目录所有文件
            const err = this.removeFiles(fs,outputPath)
            callback(err)
        })
    }
    removeFiles(fs,path){
        // 想要删除打包输出目录下所有资源，需要先将目录下的资源删除，才能删除这个目录
         try{
            // 读取当前目录下所有文件
            const files = fs.readdirSync(path);
            // 遍历文件，删除
            files.forEach(file=>{
                const path = `${filepath}/${file}`
                const filepath = fs.statSync(path);
                console.log(fileStat)
                if(fileStat.isDirectory){
                    // 文件夹
                    this.removeFiles(fs,path)
                }else{
                    fs.unlinkSync(path)
                }

            })
         }
    }
}





```

