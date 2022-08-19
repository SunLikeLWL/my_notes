
let tree = {
    "id": 1,
    "name": "A",
    "children": [
        {
            "id": 2,
            "name": "B",
            "children":
                [
                    { "id": 4, "name": "D" },
                    { "id": 5, "name": "E" }
                ]
        },
        {
            "id": 3,
            "name": "C",
            "children":
                [
                    { "id": 6, "name": "F" }
                ]
        }]
}


function convert(tree){
    const nodeToParent = new Map()
    const arr  = []
    const queue = []
    queue.unshift(tree)
    
    while (queue.length>0) {
        console.log('queue',JSON.parse(JSON.stringify(queue)))
         const curNode = queue.pop()
         if(curNode == null) break
         const {id,name,children = []} = curNode
         //  创建数组 item 并push
         const parentNode = nodeToParent.get(curNode)
         const parentId =  parentNode&&parentNode.id || 0
         const item = {id,name,parentId}
         arr.push(item)
        //  子节点入队
        children.forEach(child =>{
            nodeToParent.set(child,curNode)
            // 入队
            queue.unshift(child)
        })
    }
    return arr
}


console.log(convert(tree))