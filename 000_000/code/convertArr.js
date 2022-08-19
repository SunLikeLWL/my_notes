
const arr = [
    {id:1,name:'A',parentId:0},
    {id:2,name:'B',parentId:1},
    {id:3,name:'C',parentId:1},
    {id:4,name:'D',parentId:2},
    {id:5,name:'E',parentId:2},
    {id:6,name:'F',parentId:3},
]


function convert(arr){
  const idToTrrNode = new Map();
  let root = null;
  arr.forEach(item=>{
      const {id,name,parentId} = item
    //   定义tree node 并加入map
      const treeNode = {id,name}
      idToTrrNode.set(id,treeNode)

    //   找到parentNode 并加入到他的children
    const parentNode = idToTrrNode.get(parentId)
    if(parentNode){
        if(parentNode.children == null) parentNode.children = []
        parentNode.children.push(treeNode)
    }

    // 找到根节点

    if(parentId === 0) root = treeNode

   
  })

  console.log('idToTrrNode',idToTrrNode)
  return root
}
console.log(JSON.stringfy(convert(arr)))
