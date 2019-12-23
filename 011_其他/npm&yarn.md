#  npm & yarn 

首先，这两个都属于js包管理工具，都可以安装包或者模块
yarn是由facebook、google等联合开发推出的

区别：
1、npm下载的话比如npm install 他是按照包的排序，也是队列挨个下载，一个下载完成后，再下载另一个yarn是将要下载的包进行同时下载；

2、yarn在下载模块或包时，命令输出的信息更加简洁

3、npm版本5.0之后，会自带package.json文件，该文件主要描述了你的项目中安装的包都是哪一个版本，你再进行npm install的话，会安装指定版本的包；

4、命令不同

npm install   -   yarn 
npm install vue  - yarn add vue
npm uninstall vue - yarn remove vue
npm update - yarn upgrape


