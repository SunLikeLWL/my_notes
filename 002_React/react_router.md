 # react router


 React Router保持UI与URL同步。
 它拥有简单的API与强大的功能例如代码缓冲加载、
 动态路由匹配、以及建立正确的位置过渡处理。

 React Router是一个基于React之上的强大的路由库，
 他可以让你想应用中快速地添加视图和数据流，
 同时保持页面与UI间的同步。


 # state

 每个state组件都有自己的状态，相比于props，state只存在于组件自身内部，
 用来影响视图的展示。可以使用react内置的setState()方法修改state，
 每当使用setState()时，React会将需要更新的state合并后放入状态队列，
 触发调和过程，而不是立即更新state，然后根据新的状态结构重新渲染UI界面，
 最后React会根据差异对界面进行最小化重新渲染。