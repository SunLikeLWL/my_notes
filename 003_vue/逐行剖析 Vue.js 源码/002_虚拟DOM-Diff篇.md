# 虚拟DOM-Diff篇
学习什么是虚拟DOM，以及Vue中的DOM-Diff原理
 

## 概念
VNode最大的用途就是在数据变化前后生成真实DOM对应的虚拟DOM节点，然后就可以对比新旧两份VNode，找出差异所在，然后更新所有差异的DOM节点，最终达到以最少操作真实DOM更新视图的目的，而对比新旧两份VNode并找出差异的过程就是所谓的DOM-Diff过程。DOM-Diff是整个虚拟DOM的核心所在。


## patch

在Vue中，把DOM-Diff过程叫做patch过程。patch意为补丁，即指对旧的VNode修补


以新的VNode为基准，改造旧的的oldVNode是之成为跟新的VNode一样，这就是patch过程要干的事情

1、创建节点

2、删除节点

3、更新节点




## 创建节点

```

function createElm(vnode,parentElm,refElm){
    const data = vnode.data;
    const children = vnode.children;
    const tag = vnode.tag;
   
    if(isDef(tag)){
        vnode.elm = nodeOps.createElement(tag,vnode);  // 创建元素节点
        createChildren(vnode,children,insertedVnodeQueue) // 创建元素节点的子节点
        insert(parentElm,vnode.elm,refElm) //  插入到DOM中 
    }
    else if(isTrue(vnode.isComment(vnode.text))){
        vnode.elm = nodeOps.createComment(vnode,text) //创建注释节点
        insert(parentElm,vnode.elm,refElm); // 插入到DOM中
    }
    else{
        vnode.elm = nodeOps.createTextNode(vnode.text); // 创建文本节点
        insert(parentElm,vnode.elm,redElm); //插入到DOM中
    }
}

```

1、判断元素节点只需要判断该VNode几点是否有tag标签即可，有tag标签即为元素节点

2、判断是否为注释节点，只需要判断VNode的isComment方法创建的注释节点，在插入到DOM中

3、如果既然不是元素节点，也不是注释节点，那就认为是文本节点，则调用createTextNode方法创建文本节点，在插入到DOM中







### 删除节点

```

function removeNode(el){
    const parent = nodeOps.parentNode(el); //获取父节点

    if(isDef(parent)){
        nodeOps.removeChild(parent,el) //调用父节点的removeChild方法
    }

}



```



### 更新节点

```

// 更新节点
function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  // vnode与oldVnode是否完全一样？若是，退出程序
  if (oldVnode === vnode) {
    return
  }
  const elm = vnode.elm = oldVnode.elm

  // vnode与oldVnode是否都是静态节点？若是，退出程序
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    return
  }

  const oldCh = oldVnode.children
  const ch = vnode.children
  // vnode有text属性？若没有：
  if (isUndef(vnode.text)) {
    // vnode的子节点与oldVnode的子节点是否都存在？
    if (isDef(oldCh) && isDef(ch)) {
      // 若都存在，判断子节点是否相同，不同则更新子节点
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    }
    // 若只有vnode的子节点存在
    else if (isDef(ch)) {
      /**
       * 判断oldVnode是否有文本？
       * 若没有，则把vnode的子节点添加到真实DOM中
       * 若有，则清空Dom中的文本，再把vnode的子节点添加到真实DOM中
       */
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    }
    // 若只有oldnode的子节点存在
    else if (isDef(oldCh)) {
      // 清空DOM中的子节点
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    }
    // 若vnode和oldnode都没有子节点，但是oldnode中有文本
    else if (isDef(oldVnode.text)) {
      // 清空oldnode文本
      nodeOps.setTextContent(elm, '')
    }
    // 上面两个判断一句话概括就是，如果vnode中既没有text，也没有子节点，那么对应的oldnode中有什么就清空什么
  }
  // 若有，vnode的text属性与oldVnode的text属性是否相同？
  else if (oldVnode.text !== vnode.text) {
    // 若不相同：则用vnode的text替换真实DOM的文本
    nodeOps.setTextContent(elm, vnode.text)
  }
}

```

1、VNode和oldVNode均为静态节点

  静态节点无论数据发生任何变化都与它无关，所以都为静态节点的话则直接跳过，无需处理。

2、VNode是文本节点


那么只需看oldVNode是否也是文本节点，如果是，那就比较两个文本是否不同，如果不同则把oldVNode里的文本改成跟VNode的文本一样。如果oldVNode不是文本节点，那么不论它是什么，直接调用setTextNode方法把它改成文本节点，并且文本内容跟VNode相同。


3、VNode是元素节点
  

  a、该节点包含子节点

    如果新的节点内包含了子节点，那么此时要看旧的节点是否包含子节点，如果旧的节点里也包含了子节点，那就需要递归对比更新子节点；如果旧的节点里不包含子节点，那么这个旧节点有可能是空节点或者是文本节点，如果旧的节点是空节点就把新的节点里的子节点创建一份然后插入到旧的节点里面，如果旧的节点是文本节点，则把文本清空，然后把新的节点里的子节点创建一份然后插入到旧的节点里面。




  b、该节点不包含子节点

    如果该节点不包含子节点，同时它又不是文本节点，那就说明该节点是个空节点，那就好办了，不管旧节点之前里面都有啥，直接清空即可。

 
